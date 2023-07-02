import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SnackbarAlert } from "../components/feedback";
import DataTable from "../components/table.grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteTransactionData, getTransactions } from "../services/transaction.services";
import { useLocation } from "react-router-dom";

const Transactions = () =>{
    const [tableData, setTableData] = useState([]);
    const [load, setLoad] = useState(false);
    const [toast, setToast] = useState({open: false, msg: "", type: ""})
    const {state} = useLocation()

    const handleToastClose = () =>{
        setToast({...toast, open: false})
    }

  const tableHeaders = [
    { field: "txn_id", headerName: "Transaction Id", flex: 1, minWidth: 100 },
    { field: "txn_date", headerName: "Transactions Date", flex: 1, minWidth: 100 },
    { field: "initial_amount", headerName: "Initial Amount", flex: 1,  minWidth: 100 },
    { field: "redeem_amount", headerName: "Redeem Amount", flex: 1, minWidth: 100 },
    { field: "left_balance", headerName: "Left Balance", flex: 1 , minWidth: 100},
    { field: "voucher_id", headerName: "Voucher Id", flex: 1 , minWidth: 100},
    { field: "id", headerName: "Id", flex: 1, minWidth: 100},
  
  ];

  const handleDelete = async (id) => {
    setLoad(true)
    const {response, error} = await deleteTransactionData(id)
    setLoad(false)
    if(error){
        return setToast({open: true, msg: "something went wrong", type: "error"})
    }
    if(response?.status.includes("Deleted")){
        setToast({open: true, msg: "Deleted Successfully", type: "success"})
        fetchTransactions()
    }
  };

  const fetchTransactions = async () => {
    setLoad(true);
    const { response, error } = await getTransactions();
    setLoad(false);
    if (error) {
      return;
    }
    if (response && response?.length) {
      setTableData(response);
      localStorage.setItem("transactions", JSON.stringify(response))
    }
  };

  useEffect(() => {
    if(localStorage.getItem("transactions") && localStorage.getItem("transactions")?.length && !state?.status){
      setTableData(JSON.parse(localStorage.getItem("transactions")))
    }
    else if(state?.status){
      fetchTransactions()
    }
    else{
      fetchTransactions()
      }
  }, [state]);

  return (
    <Box>
        <SnackbarAlert open={toast.open} msg={toast.msg} type={toast.type} handleToastClose={handleToastClose}/>
        <DataTable row={tableData} column={tableHeaders} loading={load} uniqueId="txn_id" path="transaction" />
    </Box>
  );
};

export default Transactions;