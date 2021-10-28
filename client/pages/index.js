/**
 * Renzo Barrios
 * Octuber 2021
 */

import {useEffect, useState} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {checkIfWalletIsConnected, connectWallet} from "../helpers/utils";

export default function Home() {

   const [currentAccount , setCurrentAccount]  = useState("")


  useEffect(() => {
      console.log("effetc")
    checkIfWalletIsConnected().then(acc => {
        if(acc){
            console.log("acc",acc)
            setCurrentAccount(acc)
        }
    });
  }, []);

   const handleClick = () => {
     connectWallet(setCurrentAccount)
   }

  return (
    <div className={styles.container}>
      <Head>
        <title>MultiWallet 💱</title>
        <meta name="description" content="wallet dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Multipass Wallet</h1>

        <h2>
            {currentAccount}
        </h2>

        {
            !currentAccount ?
                <button onClick={handleClick}>Connect Wallet</button>:
                <h2>Account Connected</h2>
        }
    </div>
  );
}
