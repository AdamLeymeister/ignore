const complexObject = useWhateverStore();

const [memoizedComplexObject, setMemoizedComplexObject] =
  useState(complexObject);

//custom comparison function
useMemo(() => {
  if (!isEqual(memoizedComplexObject, complexObject)) {
    setMemoizedComplexObject(complexObject);
  }
}, [complexObject]);

// Use the memoizedComplexObject in your useCallback
const doStuff = useCallback(() => {}, [memoizedComplexObject]);
