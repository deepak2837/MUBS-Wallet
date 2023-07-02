import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SnackbarAlert } from "../components/feedback";
import DataTable from "../components/table.grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteAttandantData, getAttandants } from "../services/attandant.services";
import { useLocation } from "react-router-dom";

const Attandants = () =>{
    const [tableData, setTableData] = useState([]);
    const [load, setLoad] = useState(false);
    const [toast, setToast] = useState({open: false, msg: "", type: ""})
    const {state} = useLocation()

    const handleToastClose = () =>{
        setToast({...toast, open: false})
    }

  const tableHeaders = [
    { field: "atdt_id", headerName: "Attendant Id", flex: 1, minWidth: 100 },
    { field: "first_name", headerName: "First Name", flex: 1, minWidth: 100 },
    { field: "last_name", headerName: "Last Name", flex: 1,  minWidth: 100 },
    { field: "employee_id", headerName: "Employee Id", flex: 1, minWidth: 100 },
    { field: "location_id", headerName: "Location Id", flex: 1 , minWidth: 100},
    { field: "password", headerName: "Password", flex: 1 , minWidth: 100},
    { field: "profile", headerName: "Profile", flex: 1, minWidth: 100 },
    { field: "vouchers", headerName: "Vouchers", width: 80 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDelete(params?.row?.employee_id)}>
            <DeleteOutlineOutlinedIcon color="primary" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    setLoad(true)
    const {response, error} = await deleteAttandantData(id)
    setLoad(false)
    if(error){
        return setToast({open: true, msg: "something went wrong", type: "error"})
    }
    if(response?.status.includes("Deleted")){
        setToast({open: true, msg: "Deleted Successfully", type: "success"})
        fetchAttendants()
    }
  };

  const fetchAttendants = async () => {
    setLoad(true);
    const { response, error } = await getAttandants();
    setLoad(false);
    if (error) {
        return setToast({open: true, msg: "something went wrong", type: "error"})
    }
    if (response && response?.length) {
      setTableData(response);
      localStorage.setItem("attendants", JSON.stringify(response))
    }
  };

  useEffect(() => {
    if(localStorage.getItem("attendants") && localStorage.getItem("attendants")?.length && !state?.status){
        setTableData(JSON.parse(localStorage.getItem("attendants")))
    }
    else if(state?.status){
      fetchAttendants()
    }
    else{
      fetchAttendants()
    }
  }, [state]);

  return (
    <Box>
        <SnackbarAlert open={toast.open} msg={toast.msg} type={toast.type} handleToastClose={handleToastClose}/>
        <DataTable row={tableData} column={tableHeaders} loading={load} uniqueId="atdt_id" path="attendant" />
    </Box>
  );
};


export default Attandants;