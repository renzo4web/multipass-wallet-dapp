import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { ethers } from "ethers";

const NewTransfer = () => {
  const [transfer, setTransfer] = useState({
    amount: {
      value: "",
      error: false,
    },
    recipient: {
      value: "",
      error: false,
    },
  });

  const { amount, recipient } = transfer;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setTransfer((curr) => ({ ...curr, [name]: { ...curr[name], value } }));

    Number(amount.value) <= 0
      ? setError("amount", true)
      : setError("amount", false);

    !ethers.utils.isAddress(recipient.value)
      ? setError("recipient", true)
      : setError("recipient", false);

    console.log(transfer);
  };

  const setError = (name, bool) => {
    setTransfer((curr) => ({
      ...curr,
      [name]: {
        ...curr[name],
        error: bool,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Check that recipient is a eth address

    console.log("objecewewt");

    if (
      recipient.error ||
      amount.error ||
      recipient.value === "" ||
      Number(amount.value) === 0
    ) {
      return;
    }

    console.log("Sending transfer", transfer);
  };

  return (
    <div>
      <form onClick={handleSubmit}>
        <Stack spacing={4}>
          <TextField
            error={transfer.recipient.error}
            onChange={handleChange}
            name={"recipient"}
            id="recipient"
            label="Recipient"
            variant="standard"
            value={recipient.value}
          />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
              name={"amount"}
              type={"number"}
              error={amount.error}
              id="amount"
              value={amount.value.toString()}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>

          <Button variant={"outlined"}>Send</Button>
        </Stack>
      </form>
    </div>
  );
};

export default NewTransfer;
