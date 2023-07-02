import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteVoucherData, getVouchers } from "../services/voucher.services";
import DataTable from "../components/table.grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SnackbarAlert } from "../components/feedback";
import { useLocation } from "react-router-dom";

const Vouchers = () => {
    const [tableData, setTableData] = useState([]);
    const [load, setLoad] = useState(false);
    const [toast, setToast] = useState({open: false, msg: "", type: ""})
    const {state} = useLocation()

    const handleToastClose = () =>{
        setToast({...toast, open: false})
    }

  const tableHeaders = [
    { field: "voucher_id", headerName: "Voucher Id", flex: 1, minWidth: 100 },
    { field: "client_id", headerName: "Company Id", flex: 1, minWidth: 100 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "initial_amount", headerName: "Initial Amount", flex: 1,  minWidth: 100 },
    { field: "balance", headerName: "Balance", flex: 0.3, minWidth: 100 },
    { field: "start_date", headerName: "Start Date", flex: 1 , minWidth: 100},
    { field: "end_date", headerName: "End Date", flex: 1 , minWidth: 100},{ field: " ", headerName: "Created by", flex: 1, minWidth: 100 },
    { field: "", headerName: "Modified by", flex: 1, minWidth: 100 },
    {
        field: "last_transaction_id",
        headerName: "Last Transaction Id",
        flex: 1,
        minWidth: 100
    },
    { field: "last_used", headerName: "Last Used", flex: 1, minWidth: 120 },
    
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDelete(params?.row?.voucher_id)}>
            <DeleteOutlineOutlinedIcon color="primary" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    setLoad(true)
    const {response, error} = await deleteVoucherData(id)
    setLoad(false)
    if(error){
        return setToast({open: true, msg: "something went wrong", type: "error"})
    }
    if(response?.status.includes("Deleted")){
        setToast({open: true, msg: "Deleted Successfully", type: "success"})
        fetchVochers()
    }
  };

  const fetchVochers = async () => {
    setLoad(true);
    const { response, error } = await getVouchers();
    setLoad(false);
    if (error) {
      return setToast({open: true, msg: "something went wrong", type: "error"});
    }
    if (response && response?.length) {
      setTableData(response);
      localStorage.setItem("vouchers", JSON.stringify(response))

    }
  };

  useEffect(() => {
    if(localStorage.getItem("vouchers") && localStorage.getItem("vouchers")?.length && !state?.status){
        setTableData(JSON.parse(localStorage.getItem("vouchers")))
    }
    else if(state?.status){
      fetchVochers()
    }
    else{
      fetchVochers()
    }
  }, [state]);

  return (
    <Box>
        <SnackbarAlert open={toast.open} msg={toast.msg} type={toast.type} handleToastClose={handleToastClose}/>
        <DataTable row={tableData} column={tableHeaders} loading={load} uniqueId="voucher_id" path="voucher" fetch={fetchVochers}/>
    </Box>
  );
};

export default Vouchers;
