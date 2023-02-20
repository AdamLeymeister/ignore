import React, { useState, useEffect } from "react";
import { ListItem, Paper } from "@mui/material";
import Keypad from '../../modalButton/Keypad';
import { getKeypadData } from "./keypadService";
import { useKeys } from './keyStore'
import { useQuery } from "react-query"; 

  const { keys, setKeys } = useKeys();
  const { isLoading, error } = useQuery({
    queryKey: ['keys'],
    queryFn: getKeypadData,
    onSuccess: (res) => setKeys(res),
  })

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  table