import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SnackbarAlert } from "../components/feedback";
import DataTable from "../components/table.grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteClientData, getClients } from "../services/client.services";
import { useLocation } from "react-router-dom";

const Clients = () =>{
    const [tableData, setTableData] = useState([]);
    const [load, setLoad] = useState(false);
    const [toast, setToast] = useState({open: false, msg: "", type: ""})
    const {state} = useLocation()
    
    const handleToastClose = () =>{
        setToast({...toast, open: false})
    }

  const tableHeaders = [
    { field: "client_id", headerName: "Company Id", flex: 1, minWidth: 100 },
    { field: "client_name", headerName: "Company name", flex: 1 , minWidth: 100},
   
    {
      field: "last_order_date",
      headerName: "Last Order Date",
      flex: 1,
      minWidth: 100
    },
    { field: "", headerName: "Created by", flex: 1 , minWidth: 100},
    { field: " ", headerName: "Modified by", flex: 1 , minWidth: 100},
    { field: "last_order_amount", headerName: "Last Order Amount", flex: 1, minWidth: 100},
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDelete(params?.row?.client_id)}>
            <DeleteOutlineOutlinedIcon color="primary" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    setLoad(true)
    const {response, error} = await deleteClientData(id)
    setLoad(false)
    if(error){
        return setToast({open: true, msg: "something went wrong", type: "error"})
    }

    if(response?.status.includes("Deleted")){
        setToast({open: true, msg: "Deleted Successfully", type: "success"})
        fetchClients()
    }
  };

  const fetchClients = async () => {
    setLoad(true);
    const { response, error } = await getClients();
    setLoad(false);
    if (error) {
      return setToast({open: true, msg: "something went wrong", type: "error"})
    }
    if (response && response?.length) {
      console.log(response)
      setTableData(response);
      localStorage.setItem("clients", JSON.stringify(response))
    }
  };

  useEffect(() => {
    if(localStorage.getItem("clients") && localStorage.getItem("clients")?.length && !state?.status){
      console.log(JSON.parse(localStorage.getItem("clients")))
        setTableData(JSON.parse(localStorage.getItem("clients")))
    }
    else if(state?.status){
      fetchClients()
    }
    else{
      fetchClients()
    }
  }, [state]);

  return (
    <Box>
        <SnackbarAlert open={toast.open} msg={toast.msg} type={toast.type} handleToastClose={handleToastClose}/>
        <DataTable row={tableData} column={tableHeaders} loading={load} uniqueId="client_id" path="client" />
    </Box>
  );
};


export default Clients;