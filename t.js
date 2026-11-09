function getLatestMessage(messages, time) {
  let left = 0;
  let right = messages.length - 1;
  let result = null;

  while (left <= right) {
    const mid = (left + right) >>> 1;

    if (messages[mid].timestamp <= time) {
      result = messages[mid];
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result



  const currentTime = useTimelineStore(
    state => state.currentTime
  );

  const metadata = useMemo(() => {
    return Object.fromEntries(
      Object.entries(messageData).map(
        ([uid, messages]) => [
          uid,
          getLatestMessage(messages, currentTime)
        ]
      )
    );
  }, [messageData, current]
