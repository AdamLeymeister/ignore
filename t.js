function lowerBound(messages, target) {
  let low = 0;
  let high = messages.length;

  while (low < high) {
    const mid = (low + high) >>> 1;

    if (messages[mid].time < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

function getVisibleMessages(messages, time) {
  const start = lowerBound(messages, time - 5000);
  const end = lowerBound(messages, time + 15000);

  return messages.slice(start, end);
}