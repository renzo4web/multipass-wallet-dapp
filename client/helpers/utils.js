import { ethers } from "ethers";
import * as contractABI from "../abi/Wallet.json";
import { toast } from "react-toastify";
import { formatError } from "./formatError";
import { formatTransfers } from "./formatTransfers";

const CONTRACT_ADDRESS = "0x0e10Dfb36389Cc5014c807eF2E4e5Aa9a0D1eb51";


export const checkIfWalletIsConnected = async () => {
  try {

    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });


    return accounts.length !== 0 ? accounts[0] : null;
  } catch (e) {
    console.log(e);
  }

};


export const connectWallet = async (handleAccount) => {

  const { ethereum } = window;


  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return;
  }

  const accounts = await ethereum.request({ method: "eth_requestAccounts" });

  console.log("Connected", accounts[0]);
  handleAccount(accounts[0]);
};

export const getContract = async () => {
  const { ethereum } = window;
  try {

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const walletContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

      return walletContract;
    }

  } catch (e) {
    console.warn(e);
  }
};


export const approveTransfer = async (id, setNewList) => {

  try {
    const contract = await getContract();
    const txn = await contract.approveTransfer(id);
    txn.wait();
    toast.success("Transfer Approved");

    const rawList = await contract.getTransfers();
    setNewList(
      formatTransfers(rawList)
    );

  } catch (e) {
    toast.error(
      formatError(e.data.message)
    );
    console.warn(e);
  }
};


