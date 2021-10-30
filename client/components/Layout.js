import React from "react";
import Head from "next/head";
import { Box, Container, Link, Paper, Typography } from "@mui/material";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Container sx={{ maxWidth: "500px" }}>
      <Head>
        <title>Multipass Wallet 💱</title>
        <meta name="description" content="wallet dapp" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💎</text></svg>" />
      </Head>

      <Header />

      <main>{children}</main>

      <Box component={"footer"} sx={{ mx: "auto", my: "2em" }}>
        <Typography align={"center"} variant={"body1"} component={"p"}>
          Dapp made by <Link underline={"hover"} href={"https://github.com/renzo4web"} variant={"body2"}>Renzo</Link>
        </Typography>
      </Box>

    </Container>
  );
};

export default Layout;