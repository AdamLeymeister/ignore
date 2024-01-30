import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  successButton: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  errorButton: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  loadingButton: {
    backgroundColor: "transparent",
  },
}));

const CommonButton = ({ queryKey, queryFunction, onSuccess, onError }) => {
  const { data, isLoading, isError } = useQuery(queryKey, queryFunction);
  const classes = useStyles();

  const handleClick = () => {
    if (isError) {
      onError();
    } else {
      onSuccess();
    }
  };

  return (
    <Button
      variant="outlined"
      className={
        isLoading
          ? classes.loadingButton
          : isError
          ? classes.errorButton
          : data
          ? classes.successButton
          : ""
      }
      onClick={handleClick}
      disabled={isLoading}>
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: "yellow" }} />
      ) : isError ? (
        "Error"
      ) : data ? (
        "Success"
      ) : (
        "Submit"
      )}
    </Button>
  );
};

export default CommonButton;
