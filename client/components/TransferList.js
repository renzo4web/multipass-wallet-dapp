import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const TransferList = ({ list = [], onApprove }) => {
  return (

    <TableContainer>
      <Table sx={{bgcolor:'#f4f1bb'}}>

        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Approvals</TableCell>
            <TableCell>Sent</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {list.map(({ id, amount, to, approvals, sent }) => (
            <TableRow key={`key-${id}`}>
              <TableCell>
                {id}
              </TableCell>
              <TableCell>
                {amount}
              </TableCell>
              <TableCell>
                {to}
              </TableCell>
              <TableCell>
                {approvals}
              </TableCell>
              <TableCell>
                {sent ? "Yes" : "No"}
              </TableCell>
              <TableCell>
                <Button onClick={()=> onApprove(id)} variant={"contained"} color="success">Approve</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>

  );
};

export default TransferList;
