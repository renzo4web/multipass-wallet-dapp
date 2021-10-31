/**
 * Renzo Barrios
 * October 2021
 */

import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  approveTransfer,
  checkIfWalletIsConnected,
  connectWallet,
  getContract
} from "../helpers/utils";
import NewTransfer from "../components/NewTransfer";
import TransferList from "../components/TransferList";
import { ethers } from "ethers";
import { formatTransfers } from "../helpers/formatTransfers";
import { toast } from "react-toastify";
import { formatError } from "../helpers/formatError";
import { Box, Card, CardContent, CardHeader, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

export default function Home() {
  const [contract, setContract] = useState(null);
  const [newTransfer, setNewTransfer] = useState({ amount: 0, recipient: "" });
  const [sendTransfer, setSendTransfer] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [approvers, setApprovers] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [quorum, setQuorom] = useState(0);


  // EFFECT => GET CONTRACT
  useEffect(() => {
    const effect = async () => {
      try {
        const contract = await getContract();
        setContract(contract);
      } catch (e) {
        toast.error(
          formatError(e.data.message)
        );
        console.warn(e);
      }
    };
    effect().catch(console.warn);
  }, []);


  // EFFECT => GET WALLET
  useEffect(() => {
    const effect = async () => {
      try {
        const account = await checkIfWalletIsConnected();

        if (account) {
          console.log("acc", account);
          setCurrentAccount(account);
        }

        if (currentAccount !== "" && contract) {
          const rawList = await contract.getTransfers();
          const list = formatTransfers(rawList);
          console.log(list);
          setTransfers(list);

          const approvers = await contract.getApprovers();
          setApprovers(approvers);

          const quorum = await contract.quorum();
          setQuorom(Number(quorum));
        }
      } catch (e) {
        toast.error(formatError(e.data?.message));
        console.warn(e);
      }
    };
    effect().catch(console.warn);
  }, [currentAccount]);

  // EFFECT => SEND TRANSFER
  useEffect(() => {
    if (!contract) return;

    let isCurrent = true;

    (async () => {
      if (isCurrent && sendTransfer) {
        console.log("Sending");
        try {
          const transfer = await contract.createTransfer(
            newTransfer.amount,
            newTransfer.recipient
          );
          toast.info("Mining, wait please");
          await transfer.wait();
          const list = await contract.getTransfers();
          setSendTransfer(false);
          setTransfers(formatTransfers(list));
          toast.success("Transfer added to list");
        } catch (e) {
          toast.error(formatError(e.data?.message));
          console.warn(e);
        }
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [sendTransfer]);

  const handleClick = () => {
    connectWallet(setCurrentAccount);

  };

  const handleSubmit = (transfer) => {
    setNewTransfer(transfer);
    setSendTransfer(true);
  };

  const handleApprove = (id) => {
    approveTransfer(id, setTransfers);
  };

  return (
    <div className={styles.container}>

      {!currentAccount && (
        <button onClick={handleClick}>Connect Wallet</button>
      )}

      {approvers.length !== 0 ? (
        <>
          <Stack
            direction={{ xs: "column", sm: "column" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ py: "2em", maxWidth: "fit-content", mx: "auto" }}
          >
            <Box sx={{ bgcolor: "#9bc1bc", padding: "1em", overflowX: "auto", borderRadius: "5px" }}>
              <Typography variant={"h6"} component={"h3"}>Account
                Connected: {currentAccount}</Typography>
              <Typography variant={"h6"} component={"h5"}>Min quorum: {quorum}</Typography>
            </Box>
            <List sx={{ bgcolor: "#9bc1bc", overflowX: "auto", borderRadius: "5px", padding: "1em" }}>
              <Typography variant={"h6"} component={"h5"}>List of Approvers</Typography>
              {approvers.map((address) => (
                <ListItem key={address}>
                  <ListItemText primary={`Approver: ${address}`} />
                </ListItem>
              ))}
            </List>
          </Stack>
        </>
      ) : (
        <p>No Approves for the moment</p>
      )}

      <Card variant="outlined" sx={{ padding: "1em", maxWidth: "400px", mx: "auto", my: "2em", bgcolor: "#f4f1bb" }}>
        <CardHeader title={"Create Transfer"} />
        <CardContent>
          <NewTransfer onSubmit={handleSubmit} />
        </CardContent>
      </Card>


      <TransferList list={transfers} onApprove={handleApprove} />
    </div>
  );
}
