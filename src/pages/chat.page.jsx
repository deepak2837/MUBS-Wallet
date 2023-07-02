import React, { useEffect, useState } from "react";
import { getChats } from "../services/chat.services";
import { Box } from "@mui/material";
import { SnackbarAlert } from "../components/feedback";
import DataTable from "../components/table.grid";

export const Chat = () =>{
    const [tableData, setTableData] = useState([]);
    const [load, setLoad] = useState(false);
    const [toast, setToast] = useState({open: false, msg: "", type: ""})
    
    const handleToastClose = () =>{
        setToast({...toast, open: false})
    }

  const tableHeaders = [
    { field: "employee_id", headerName: "Attendant Id", flex: 1, minWidth: 100 },
    { field: "message", headerName: "Message", flex: 1,  minWidth: 100 },
    { field: "created_at", headerName: "Time", flex: 1, minWidth: 100 },
  ];

  const fetchChats = async () => {
    setLoad(true);
    const { response, error } = await getChats();
    setLoad(false);
    if (error) {
      return setToast({open: true, msg: "something went wrong", type: "error"})
    }
    if (response && response?.length) {
      setTableData(response);
    }
  };

  useEffect(() => {
      fetchChats()
  }, []);

  return (
    <Box>
        <SnackbarAlert open={toast.open} msg={toast.msg} type={toast.type} handleToastClose={handleToastClose}/>
        <DataTable row={tableData} column={tableHeaders} loading={load} uniqueId="chat_id" path="chat" />
    </Box>
  );
};