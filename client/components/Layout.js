import React from 'react';
import Head from "next/head";
import {Paper} from "@mui/material";

const Layout = ({children}) => {
    return (
        <div>

            <Head>
                <title>MultiWallet 💱</title>
                <meta name="description" content="wallet dapp"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <header>Multipass wallet</header>

            <Paper>
                <main>{children}</main>
            </Paper>

            <footer>By Renzo</footer>
        </div>
    );
};

export default Layout;