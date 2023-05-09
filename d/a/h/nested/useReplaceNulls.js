export const replaceNullValues = (data, cache = new Map()) => {
  if (data === null) {
    return "";
  } else if (typeof data !== 'object') {
    return data;
  } else if (Array.isArray(data)) {
    return data.map(item => replaceNullValues(item, cache));
  } else {
    if (cache.has(data)) {
      return cache.get(data);
    }
    const result = Object.entries(data).reduce((acc, [key, value]) => {
      const replacedValue = replaceNullValues(value, cache);
      if (replacedValue !== null) {
        acc[key] = replacedValue;
      }
      return acc;
    }, {});
    cache.set(data, result);
    return result;
  }
}