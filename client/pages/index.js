/**
 * Renzo Barrios
 * Octuber 2021
 */

import {useEffect, useState} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {checkIfWalletIsConnected, connectWallet, getContract} from "../helpers/utils";

export default function Home() {

    const [currentAccount, setCurrentAccount] = useState("")
    const [approvers, setApprovers] = useState([])
    const [quorum, setQuorom] = useState(0)

    // TODO: show approvers list and qourom


    useEffect(() => {

        const effect = async () => {

            try {
                const account = await checkIfWalletIsConnected()

                if (account) {
                    console.log("acc", account)
                    setCurrentAccount(account)
                }

                if (currentAccount !== "") {
                    const walletContract = await getContract()
                    const approvers = await walletContract.getApprovers()
                    setApprovers(approvers)
                    const quorum = await walletContract.quorum()
                    setQuorom(Number(quorum))
                }

            } catch (e) {
                console.warn(e)

            }
        }
        effect().catch(console.warn)

    }, [currentAccount]);

    const handleClick = () => {
        connectWallet(setCurrentAccount)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>MultiWallet 💱</title>
                <meta name="description" content="wallet dapp"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h1>Multipass Wallet</h1>

            <h2>
                {currentAccount}
            </h2>

            {
                !currentAccount ?
                    <button onClick={handleClick}>Connect Wallet</button> :
                    <h2>Account Connected</h2>
            }

            {
                approvers.length !== 0 ?
                    <>
                        <h4>List of approvers</h4>
                        <ul>
                            {
                                approvers.map(transfer => (
                                    <li key={transfer}>
                                        <strong>
                                            Approve Address :
                                        </strong>
                                        {JSON.stringify(transfer, null, 2)}
                                    </li>
                                ))
                            }
                        </ul>
                    </> :
                    <p>No Approves for the moment</p>
            }
            <p>Quorum : {quorum}</p>
        </div>
    );
}
