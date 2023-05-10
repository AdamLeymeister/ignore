// This function recursively traverses the provided data, replacing null values with an empty string.
// It uses a cache to avoid infinite loops when encountering circular references.
// It also accepts an optional function `fn` that it applies to each object in the data.
export const replaceNullValues = (data, cache = new Map(), fn = null) => {
  // If the current data is null, return an empty string.
  if (data === null) {
    return "";
  } 
  // If the current data is not an object (it's a primitive value), return it as is.
  else if (typeof data !== 'object') {
    return data;
  } 
  // If the current data is an array, map over it, recursively calling replaceNullValues on each item.
  else if (Array.isArray(data)) {
    return data.map(item => replaceNullValues(item, cache, fn));
  } 
  else {
    // If the current data is an object that has already been processed, return the cached result.
    if (cache.has(data)) {
      return cache.get(data);
    }
  
    // If the current data is an unprocessed object, reduce over its entries (key-value pairs).
    // For each entry, recursively call replaceNullValues on the value and add the resulting key-value pair
    // to the accumulator object (if the resulting value is not null).
    let result = Object.entries(data).reduce((acc, [key, value]) => {
      const replacedValue = replaceNullValues(value, cache, fn);
      if (replacedValue !== null) {
        acc[key] = replacedValue;
      }
      return acc;
    }, {});

    // If the optional function parameter was provided, call it with the result object and assign the return value to result.
    if (fn) {
      result = fn(result);
    }

    // Cache the result object using the original data object as the key.
    cache.set(data, result);

    // Return the result object.
    return result;
  }
};
