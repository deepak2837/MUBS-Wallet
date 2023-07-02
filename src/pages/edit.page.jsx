import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { attendantData, clientData, transactionData, voucherData } from "../data/modals";
import { LoadingBackdrop, SnackbarAlert } from "../components/feedback";
import { createVoucherData, putVoucherData } from "../services/voucher.services";
import { createClientData, putClientData } from "../services/client.services";
import { createTransactionData, putTransactionData } from "../services/transaction.services";
import { createAttandantData, putAttandantData } from "../services/attandant.services";

const EditPage = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState({})
    const [data, setData] = useState({})
    const [store, setStore] = useState({})
    const { path, id } = useParams();
    const { state }  = useLocation()
    const [load, setLoad] = useState(false)
    const [toast, setToast] = useState({open: false, msg: "", type: ""})

    const handleToastClose = () =>{
        setToast({...toast, open: false})
    }

    const handleType = (title) =>{
        if(title.includes("date") || title === "last_used"){
            return "date"
        }
        else if(title.includes("client_id") || title.includes("balance") || title.includes("amount") || title.includes("vouchers") || title.includes("txn_id") || title.includes("atdt_id") ){
            return "number"
        }
        else{
            return "text"
        }
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;

        if(e.target.type === "number"){
            setData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
        }else{
            setData((prevData) => ({ ...prevData, [name]: value }));
        }
    }

    const handleReset = () =>{
        setData({ ...store });
    }

    const handleSave = async () =>{
        setLoad(true)
        if(window.location.pathname.includes("add")){
            let resObject = {}
            let status = ""
            let addData = {"data": [data]}
            if(window.location.pathname.includes("vouchers")){
                Object.keys(data).forEach((title)=>{
                    if(title === "last_used"){
                        if(data[title]?.length < 1 || !data[title]){
                            let copy = data
                            delete copy[title]
                            addData = {data: [copy]}
                        }
                    }
                    else{
                        if(data[title]?.length < 1 && title.includes("last") === false){
                            setLoad(false)
                            setToast({open: true, msg: `${title} is empty`, type: "error"})
                            status = "error"
                            return
                        }
                    }
                })
                if(status !== "error"){
                    resObject = await createVoucherData(addData)
                }
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    if(resObject?.response[0][data["voucher_id"]]["client_id"]){
                        setToast({open: true, msg: "Wrong Client Id!", type: "error"})
                    }
                    if(resObject?.response[0][data["voucher_id"]]["last_date"]){
                        setToast({open: true, msg: "Incorrect format of Last Date - YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]", type: "error"})
                    }
                    else{
                        setToast({open: true, msg: "Added Successfully", type: "success"})
                        setTimeout(()=>{
                            navigate("/vouchers", {state: {status: true}})
                        },1500)
                    }
                }
            }
            if(window.location.pathname.includes("clients")){
                Object.keys(data).forEach((title)=>{
                    if(title.includes("last_order")){
                        if(data[title]?.length < 1 || !data[title]){
                            let copy = data
                            delete copy[title]
                            addData = {data: [copy]}
                        }
                    }
                    else{
                        if(data[title]?.length < 1){
                            setLoad(false)
                            setToast({open: true, msg: `${title} is empty`, type: "error"})
                            status = "error"
                            return
                        }
                    }
                })
                if(status !== "error"){
                    resObject = await createClientData(addData)
                }
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    setToast({open: true, msg: "Added successfully!", type: "success"})
                    setTimeout(()=>{
                        navigate("/clients", {state: {status: true}})
                    },1500)
                }
            }
            if(window.location.pathname.includes("transactions")){
                resObject = await createTransactionData(addData)
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    setToast({open: true, msg: "Added successfully!", type: "success"})
                    setTimeout(()=>{
                        navigate("/transactions", {state: {status: true}})
                    },1500)
                }
            }
            if(window.location.pathname.includes("attendants")){
                Object.keys(data).forEach((title)=>{
                    if(title === "profile"){
                        if(data?.profile?.length < 1 || !data?.profile){
                            let copy = data
                            delete copy["profile"]
                            addData = {data: [copy]}
                        }
                    }
                    else{
                        if(data[title]?.length < 1){
                            setLoad(false)
                            setToast({open: true, msg: `${title} is empty`, type: "error"})
                            status = "error"
                            return
                        }
                    }
                })
                if(status !== "error"){
                    resObject = await createAttandantData(addData)
                }
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    setToast({open: true, msg: "Added successfully!", type: "success"})
                    setTimeout(()=>{
                        navigate("/attendants", {state: {status: true}})
                    },1500)
                }
            }

        }
        else{
            let resObject = {}
            let status = ""
            if(window.location.pathname.includes("vouchers")){
                Object.keys(data).forEach((title)=>{
                    if(title === "last_used"){
                        if(data[title]?.length < 1 || !data[title]){
                            let copy = data
                            delete copy[title]
                            setData({...copy})
                        }
                    }
                    else{
                        if(data[title]?.length < 1 && title.includes("last") === false){
                            setLoad(false)
                            setToast({open: true, msg: `${title} is empty`, type: "error"})
                            status = "error"
                            return
                        }
                    }
                })
                if(status !== "error"){
                    resObject = await putVoucherData(data?.voucher_id, data)
                }
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    if(resObject?.response["status"].includes("Updated")){
                        setToast({open: true, msg: "Updated Successfully", type: "success"})
                        setTimeout(()=>{
                            navigate("/vouchers", {state: {status: true}})
                        },1500)
                    }
                    else if(resObject?.response[0][data["voucher_id"]]["client_id"]){
                        setToast({open: true, msg: "Wrong Client Id!", type: "error"})
                    }
                    else if(resObject?.response[0][data["voucher_id"]]["last_date"]){
                        setToast({open: true, msg: "Incorrect format of Last Date - YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]", type: "error"})
                    }
                    else{
                        setToast({open: true, msg: "Wrong Data", type: "error"})
                    }
                }
            }
            if(window.location.pathname.includes("clients")){
                Object.keys(data).forEach((title)=>{
                    if(title.includes("last_order")){
                        if(data[title]?.length < 1 || !data[title]){
                            let copy = data
                            delete copy[title]
                            setData({...copy})
                        }
                    }
                    else{
                        if(data[title]?.length < 1){
                            setLoad(false)
                            setToast({open: true, msg: `${title} is empty`, type: "error"})
                            status = "error"
                            return
                        }
                    }
                })
                if(status !== "error"){
                    resObject = await putClientData(data?.client_id, data)
                }
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    setToast({open: true, msg: "Update successfully!", type: "success"})
                    setTimeout(()=>{
                        navigate("/clients", {state: {status: true}})
                    },1500)
                }
            }
            if(window.location.pathname.includes("transactions")){
                resObject = await putTransactionData(data?.txn_id, data)
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    setToast({open: true, msg: "Update successfully!", type: "success"})
                    setTimeout(()=>{
                        navigate("/transactions", {state: {status: true}})
                    },1500)
                }
            }
            if(window.location.pathname.includes("attendants")){
                let updated = data
                Object.keys(data).forEach((title)=>{
                    if(title === "profile"){
                        if(data?.profile?.length < 1 || !data?.profile){
                            let copy = data
                            delete copy["profile"]
                            updated = copy
                        }
                    }
                    else{

                        if(data[title]?.length < 1){
                            setLoad(false)
                            setToast({open: true, msg: `${title} is empty`, type: "error"})
                            status = "error"
                            return
                        }
                    }
                })
                if(status !== "error"){
                    resObject = await putAttandantData(data?.employee_id, updated)
                }
                setLoad(false)
                if(resObject?.error){
                    return setToast({open: true, msg: "Something went wrong", type: "error"})
                }
                if(Object.keys(resObject?.response || {})?.length){
                    setToast({open: true, msg: "Update successfully!", type: "success"})
                    setTimeout(()=>{
                        navigate("/attendants", {state: {status: true}})
                    },1500)
                }
            }

        }
    }


    useEffect(() => {
        setData(state)
        setStore(state)
        if(path === "vouchers"){
            setModal(voucherData())
            if(window.location.pathname.includes("add")){
                setData(voucherData())
            }
        }
        else if(path === "clients"){
            setModal(clientData())
            if(window.location.pathname.includes("add")){
                setData(clientData())
            }
        }
        else if(path === "transactions"){
            setModal(transactionData())
            if(window.location.pathname.includes("add")){
                setData(transactionData())
            }
        }
        else if(path === "attendants"){
            setModal(attendantData())
            if(window.location.pathname.includes("add")){
                setData(attendantData())
            }
        }
        else(
            navigate("/*")
        )
    }, [navigate, path, state]);

    return (
        <Box>
            <SnackbarAlert open={toast.open} msg={toast.msg} type={toast.type} handleToastClose={handleToastClose}/>
            <LoadingBackdrop open={load} />
            <Stack sx={{ margin: {xs: "2%", md: "4%", sm: "3%", lg: "5%"} }} gap={6}>
                <Stack direction="row" gap={{xs: 0, md: 1, sm: 1, lg: 1}} sx={{marginTop: {xs: 2}}}>
                    <IconButton onClick={()=> navigate(-1)}>
                        <ArrowBackIosRoundedIcon sx={{fontSize: {xs: "medium", md: "large", lg: "large", sm: 'large'}}}/>
                    </IconButton>
                    <Typography variant="body1" gutterBottom sx={{mt: "auto", mb: "auto", fontWeight: '400'}}>{`${path.toUpperCase()} #${id || "add"}`}</Typography>
                </Stack>
                <Grid container spacing={3} >
                    {
                        Object.keys(modal)?.filter((title)=> title.includes("last_") === false)?.map((title, index)=>{
                            return(
                                <Grid item xs={12} sm={6} key={index}>
                                    {
                                        title==="status" ? (
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                                                <Select
                                                    key={index}
                                                    name={title}
                                                    label={title}
                                                    value={data ? data[title] : ""}
                                                    onChange={(e)=>handleChange(e)}
                                                >
                                                    <MenuItem value="A">Active</MenuItem>
                                                    <MenuItem value="I">Inactive</MenuItem>
                                                    <MenuItem value="V">Void</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <FormControl fullWidth>
                                                <TextField
                                                    key={index}
                                                    name={title}
                                                    label={title}
                                                    value={data ? data[title] : ""}
                                                    InputLabelProps={{ shrink: true, required: true }}
                                                    type={handleType(title)}
                                                    fullWidth
                                                    onChange={(e)=>handleChange(e)}
                                                    InputProps={{
                                                        readOnly: window.location.pathname.includes("transactions") ? true : false 
                                                    }}
                                                />
                                            </FormControl>
                                        )
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
                    {
                        !window.location.pathname.includes("transactions") ? (
                            <>
                                <Button variant="outlined" size="small" onClick={()=> handleReset()}>Reset</Button>
                                <Button variant="outlined" size="small" onClick={()=> handleSave()}>Save</Button>
                            </>
                            ) : ""
                        }
                </Stack>
            </Stack>
        </Box>
    );
};

export default EditPage;
