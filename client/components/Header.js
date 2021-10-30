import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box component={"header"}>
      <Typography sx={{textAlign:"center"}} variant={"h2"} component={"h1"}>MultiWallet</Typography>
    </Box>
  );
};

export default Header;