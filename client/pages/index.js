/**
 * Renzo Barrios
 * Octuber 2021
 */

import {useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import {
    checkIfWalletIsConnected,
    connectWallet,
    getContract,
} from "../helpers/utils";
import NewTransfer from "../components/NewTransfer";
import TransferList from "../components/TransferList";
import {ethers} from "ethers";
import {formatTransfers} from "../helpers/formatTransfers";

export default function Home() {
    const [contract, setContract] = useState(null);
    const [newTransfer, setNewTransfer] = useState({amount: 0, recipient: ""});
    const [sendTransfer, setSendTransfer] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [approvers, setApprovers] = useState([]);
    const [transfers, setTransfers] = useState([])
    const [quorum, setQuorom] = useState(0);

    // TODO: show approvers list and qourom


    // EFFECT => GET CONTRACT
    useEffect(() => {
        const effect = async () => {
            try {
                const contract = await getContract()
                setContract(contract)
            } catch (e) {
                console.warn(e)
            }
        }
        effect().catch(console.warn)
    }, [])


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
                   const list  = formatTransfers(rawList)
                    console.log(list)
                    setTransfers(list)

                    const approvers = await contract.getApprovers();
                    setApprovers(approvers);

                    const quorum = await contract.quorum();
                    setQuorom(Number(quorum));

                }

            } catch (e) {
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
                console.log("Sending")
                try {
                    const transfer = await contract.createTransfer(newTransfer.amount, newTransfer.recipient);
                    console.log("MINNING")
                    await transfer.wait();

                    console.log(transfer);
                    const list = await contract.getTransfers();
                    setSendTransfer(false);
                    setTransfers(formatTransfers(list))
                } catch (e) {
                    console.warn(e)
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

    return (
        <div className={styles.container}>
            <h2>{currentAccount}</h2>

            {!currentAccount ? (
                <button onClick={handleClick}>Connect Wallet</button>
            ) : (
                <h2>Account Connected</h2>
            )}

            {approvers.length !== 0 ? (
                <>
                    <h4>List of approvers</h4>
                    <ul>
                        {approvers.map((transfer) => (
                            <li key={transfer}>
                                <strong>Approve Address :</strong>
                                {JSON.stringify(transfer, null, 2)}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No Approves for the moment</p>
            )}
            <p>Quorum : {quorum}</p>

            <h4>Create Transfers</h4>

            <NewTransfer onSubmit={handleSubmit}/>

            <TransferList list={transfers}/>
        </div>
    );
}
