const Comp = () => {
  const queryFunction = () => {
    return axios.post("stuff.com", { name: "phill" }).then((res) => res.data);
  };

  const handleSuccess = () => {
    console.log("success");
  };

  const handleError = () => {
    console.log("err");
  };

  return (
    <CommonButton
      queryKey="submitData"
      queryFunction={queryFunction}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};
