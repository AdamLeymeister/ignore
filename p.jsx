
import {
  useQueries,
  useQueryClient
} from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const SEGMENT_MS = 30_000;
const BUFFER_MS = 5_000;
const VISIBLE_MS = 10_000;
const GC_MS = 5 * 60_000;

const EMPTY = Object.freeze({});

// First index whose timestamp >= target.
function lowerBound(messages, target) {
  let low = 0;
  let high = messages.length;

  while (low < high) {
    const mid = (low + high) >>> 1;

    if (messages[mid].timestamp < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

function getSegmentStart(time) {
  return Math.floor(time / SEGMENT_MS) * SEGMENT_MS;
}

function getQueryOptions(recordingId, start) {
  return {
    queryKey: ["radar-messages", recordingId, start],

    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        start: String(start),
        end: String(start + SEGMENT_MS)
      });

      const response = await fetch(
        `/api/recordings/${encodeURIComponent(recordingId)}/messages?${params}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // Expected: { r1: [], r2: [], r3: [], ... }
      const data = await response.json();

      // Each radar array must be sorted by timestamp.
      return data;
    },

    staleTime: Infinity,
    gcTime: GC_MS
  };
}

export function useRadarMessages(
  recordingId,
  currentTime,
  recordingStart = 0,
  recordingEnd = Infinity
) {
  const queryClient = useQueryClient();

  const rangeStart = Math.max(
    recordingStart,
    currentTime - BUFFER_MS
  );

  const rangeEnd = Math.min(
    recordingEnd,
    currentTime + VISIBLE_MS + BUFFER_MS
  );

  const currentSegment = getSegmentStart(currentTime);

  // Segments intersecting the visible range.
  const requiredSegments = useMemo(() => {
    if (rangeEnd <= rangeStart) return [];

    const first = getSegmentStart(rangeStart);
    const last = getSegmentStart(rangeEnd - 1);

    const segments = [];

    for (
      let start = first;
      start <= last;
      start += SEGMENT_MS
    ) {
      segments.push(start);
    }

    return segments;
  }, [rangeStart, rangeEnd]);

  const queries = useQueries({
    queries: requiredSegments.map(start => ({
      ...getQueryOptions(recordingId, start),
      enabled: Boolean(recordingId)
    })),

    // Preserve individual segment references.
    combine: results => ({
      segments: results.every(r => r.isSuccess)
        ? results.map(r => r.data)
        : null,

      isLoading: results.some(r => r.isPending),
      isFetching: results.some(r => r.isFetching),
      error: results.find(r => r.isError)?.error ?? null
    })
  });

  // Prefetch previous and next segments.
  useEffect(() => {
    if (!recordingId) return;

    const neighbors = [
      currentSegment - SEGMENT_MS,
      currentSegment + SEGMENT_MS
    ];

    for (const start of neighbors) {
      if (
        start + SEGMENT_MS <= recordingStart ||
        start >= recordingEnd
      ) {
        continue;
      }

      queryClient.prefetchQuery(
        getQueryOptions(recordingId, start)
      );
    }
  }, [
    queryClient,
    recordingId,
    currentSegment,
    recordingStart,
    recordingEnd
  ]);

  // Combine cached segments while preserving radar grouping.
  const groupedMessages = useMemo(() => {
    if (!queries.segments) return EMPTY;

    const grouped = {};

    for (const segment of queries.segments) {
      for (const [radar, messages] of Object.entries(segment)) {
        if (!grouped[radar]) {
          grouped[radar] = [];
        }

        // Each segment is chronological and non-overlapping.
        grouped[radar].push(...messages);
      }
    }

    return grouped;
  }, [queries.segments]);

  // Binary search each radar independently.
  const visibleMessages = useMemo(() => {
    const result = {};

    for (const [radar, messages] of Object.entries(groupedMessages)) {
      const startIndex = lowerBound(messages, rangeStart);
      const endIndex = lowerBound(messages, rangeEnd);

      result[radar] = messages.slice(startIndex, endIndex);
    }

    return result;
  }, [groupedMessages, rangeStart, rangeEnd]);

  return {
    messages: visibleMessages,
    groupedMessages,
    isLoading: queries.isLoading,
    isFetching: queries.isFetching,
    error: queries.error,
    currentSegment,
    requiredSegments
  };
}
