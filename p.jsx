import React, { useState, useEffect, useMemo, useRef } from "react";
import Plotly from "plotly.js-dist";
import messages from "./messages.json";

const TYPES = ["Type 1", "Type 2", "Type 3", "Type 4", "Type 5"];

const COLORS = {
  "Type 1": "#3498db",
  "Type 2": "#e74c3c",
  "Type 3": "#2ecc71",
  "Type 4": "#f39c12",
  "Type 5": "#9b59b6",
};

const WINDOW_MS = 5000;

export default function TypeTimeline() {
  const chartRef = useRef(null);
  const timerRef = useRef(null);

  // Parse and sort
  const parsedMessages = useMemo(() => {
    return messages
      .map((msg, index) => ({
        ...msg,
        id: msg.id ?? index,
        time: new Date(msg.timestamp).getTime(),
      }))
      .filter((msg) => Number.isFinite(msg.time))
      .sort((a, b) => a.time - b.time);
  }, []);

  const startTime = parsedMessages[0]?.time ?? 0;
  const endTime = parsedMessages[parsedMessages.length - 1]?.time ?? 0;

  const [currentTime, setCurrentTime] = useState(startTime);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Messages visible in the selected time window.
  const visibleMessages = useMemo(() => {
    return parsedMessages.filter(
      (msg) => msg.time >= currentTime - WINDOW_MS && msg.time <= currentTime,
    );
  }, [parsedMessages, currentTime]);

  // Plotly traces: one trace per type.
  const traces = useMemo(() => {
    return TYPES.map((type) => {
      const typeMessages = parsedMessages.filter(
        (msg) => msg.type === type && msg.time <= currentTime,
      );

      return {
        x: typeMessages.map((msg) => new Date(msg.time)),
        y: typeMessages.map(() => type),

        customdata: typeMessages.map((msg) => [
          msg.id,
          msg.messageType,
          msg.trackId,
        ]),

        type: "scatter",
        mode: "markers",
        name: type,

        marker: {
          color: COLORS[type],
          size: 9,
        },

        hovertemplate:
          "<b>%{y}</b><br>" +
          "Time: %{x}<br>" +
          "Message: %{customdata[1]}<br>" +
          "Track ID: %{customdata[2]}" +
          "<extra></extra>",
      };
    });
  }, [parsedMessages, currentTime]);

  // Create/update the Plotly chart.
  useEffect(() => {
    if (!chartRef.current || !parsedMessages.length) return;

    const layout = {
      title: "Type Message Timeline",

      height: 500,

      margin: {
        l: 100,
        r: 30,
        t: 60,
        b: 90,
      },

      hovermode: "closest",

      xaxis: {
        title: "Message Timestamp",
        type: "date",
        range: [new Date(startTime), new Date(endTime)],
        rangeslider: {
          visible: true,
        },
      },

      yaxis: {
        title: "Message Group",
        categoryorder: "array",
        categoryarray: TYPES,
        autorange: "reversed",
      },

      shapes: [
        {
          type: "line",
          xref: "x",
          yref: "paper",
          x0: new Date(currentTime),
          x1: new Date(currentTime),
          y0: 0,
          y1: 1,
          line: {
            color: "#ffffff",
            width: 2,
            dash: "dash",
          },
        },
      ],

      showlegend: true,
    };

    Plotly.react(chartRef.current, traces, layout, {
      responsive: true,
      scrollZoom: true,
      displayModeBar: true,
    });

    const handleClick = (event) => {
      const point = event.points?.[0];

      if (!point) return;

      const messageId = point.customdata[0];

      const message = parsedMessages.find((msg) => msg.id === messageId);

      setSelectedMessage(message ?? null);
    };

    chartRef.current.on("plotly_click", handleClick);

    return () => {
      if (chartRef.current) {
        chartRef.current.removeAllListeners("plotly_click");
      }
    };
  }, [traces, currentTime, parsedMessages, startTime, endTime]);

  // Playback timer.
  useEffect(() => {
    if (!playing) return;

    timerRef.current = setInterval(() => {
      setCurrentTime((previous) => {
        const next = previous + 250 * speed;

        if (next >= endTime) {
          setPlaying(false);
          return endTime;
        }

        return next;
      });
    }, 250);

    return () => clearInterval(timerRef.current);
  }, [playing, speed, endTime]);

  // Cleanup.
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toISOString();
  };

  const handleSeek = (event) => {
    setCurrentTime(Number(event.target.value));
    setSelectedMessage(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Type Event Analysis</h2>

      {/* Playback controls */}

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 15,
        }}>
        <button
          onClick={() => {
            setPlaying(false);
            setCurrentTime(startTime);
          }}>
          Reset
        </button>

        <button onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </button>

        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={5}>5x</option>
          <option value={10}>10x</option>
        </select>

        <span>{formatTime(currentTime)}</span>
      </div>

      {/* Time slider */}

      <input
        type="range"
        min={startTime}
        max={endTime}
        value={currentTime}
        onChange={handleSeek}
        style={{ width: "100%" }}
      />

      {/* Plotly chart */}

      <div ref={chartRef} style={{ width: "100%", height: 500 }} />

      {/* Message table */}

      <h3>Messages in Last 5 Seconds ({visibleMessages.length})</h3>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Type</th>
              <th>Message Type</th>
              <th>Track ID</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {visibleMessages.map((msg) => (
              <tr
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                style={{
                  cursor: "pointer",
                  background:
                    selectedMessage?.id === msg.id ? "#dbeafe" : "transparent",
                }}>
                <td>{formatTime(msg.time)}</td>
                <td>{msg.type}</td>
                <td>{msg.messageType}</td>
                <td>{msg.trackId}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(msg);
                    }}>
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected message details */}

      {selectedMessage && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid #ccc",
          }}>
          <h3>Selected Message</h3>

          <pre
            style={{
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}>
            {JSON.stringify(selectedMessage, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}































const CHUNK_SIZE = 8 * 1024 * 1024;

async function uploadFile(file, uploadId) {
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);

    const chunk = file.slice(start, end);

    const response = await fetch(
      `/api/uploads/${uploadId}/chunks/${i}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream"
        },
        body: chunk
      }
    );

    if (!response.ok) {
      throw new Error(`Chunk ${i} failed`);
    }
  }
}
