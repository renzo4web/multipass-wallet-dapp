import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const TransferList = ({list = []}) => {
    return (

            <TableContainer>
                <Table>

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

                        {list.map((transfer) => (
                            <TableRow key={`key-${transfer.id.toString()}`}>
                                <TableCell>
                                    {transfer.id.toString()}
                                </TableCell>
                                <TableCell>
                                    {transfer.amount.toString()}
                                </TableCell>
                                <TableCell>
                                    {transfer.to}
                                </TableCell>
                                <TableCell>
                                    {transfer.approvals}
                                </TableCell>
                                <TableCell>
                                    {transfer.sent.toString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

    );
};

export default TransferList;
