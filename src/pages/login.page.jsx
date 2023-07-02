import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import illustration from "../data/logo.png"
import { LoginService } from "../services/login.services";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import { SnackbarAlert } from "../components/feedback";



const LoginPage = () => {

    const [ credentials, setCredentials ] = useState({username: "", password: ""})
    const [ load, setLoad ] = useState(false) 
    const navigate = useNavigate()
    const [toast, setToast] = useState({open: false, msg: "", type: ""})

    const handleToastClose = () =>{
        setToast({...toast, open: false})
    }

    const handleChange = (e) =>{
        if(e.target.name === "username"){
            setCredentials({...credentials, username: e.target.value })
        }
        else if(e.target.name === "password"){
            setCredentials({...credentials, password: e.target.value})
        }
    }

    const handleSubmit = async () =>{
        setLoad(true)
        const {token, error} = await LoginService(credentials);
        setLoad(false)
        if(error){
            return error
        }
        if(!token || !token?.length ){
            setToast({open: true, msg: "Invalid Login!", type: "error"})
        }
        if(token?.length){  
            localStorage.setItem("token", token)
            navigate("/clients")
        }
    }

    return (
        <Box sx={{
            display: "row",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: '#2b3390',
        }}>
            <SnackbarAlert open={toast.open} msg={toast.msg} type={toast.type} handleToastClose={handleToastClose}/>
            <Box component="header" 
                sx={{
                    display: "flex",
                    height: "40px",
                    padding: { md: "20px 70px", xs: "20px 40px" },
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "236px",
                    marginTop:"0px",
                    flexShrink: 0,
                    
            }}>
                {/* <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}>
                    <LanguageIcon fontSize="medium"/>
                    <Button size="small" variant="outlined">Sign up</Button>
                </Box> */}
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                minHeight: "90vh",
                flexDirection: { md: "row" },
                overflow: "hidden",
            }}> 
                <Box
                    component="div"
                    sx={{
                        display: "inline-flex",
                        pl: "2.5%",
                        pr: "2.5%",
                        pt: "5%",
                        pb: "5%",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "30px",
                        bgcolor: 'background.paper',
                        // boxShadow: "10px 10px 25px #aaaaaa" 
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "50px"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "12px",
                            textAlign: 'center'
                        }}>
                            <Typography variant="h4" fontWeight="500">SIGN IN</Typography>
                            {/* <Typography>Hey, Enter your details to loginto your account</Typography> */}
                        </Box>
                        
                        <Box>
                            <TextField 
                                name="username"
                                label="Username"
                                type="email"
                                size="small"
                                required
                                value={credentials.username}
                                sx={{
                                    width: '100%',
                                    marginBottom: "5%"
                                }}
                                onChange={(e)=>handleChange(e)}
                            />
                            <TextField 
                                name="password"
                                label="Password"
                                type="password"
                                size="small"
                                required
                                value={credentials.password}
                                sx={{
                                    width: '100%',
                                    marginBottom: "5%"
                                }}
                                onChange={(e)=>handleChange(e)}
                            />
                            <Typography variant="body2">Forgot password? <a href="/changePassword">Change Password</a></Typography>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "90%"
                        }}>
                            <LoadingButton
                                size="medium" 
                                variant="contained" 
                                fullWidth 
                                loading={load}
                                onClick={()=> handleSubmit()}
                                >
                                    Sign in
                            </LoadingButton>
                           
                        </Box>
                    </Box>
                </Box>
                <Box
                    component="img"
                    sx={{marginBottom:"0px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'none', sx: 'none' },
                        minWidth: { md: 450 },
                        width: 300,
                        height: 410,
                        borderRadius: '30px',

                        // maxHeight: { xs: 233, md: 167 },
                        // maxWidth: { xs: 350, md: 250 },
                        flexShrink: 0,
                        [`@media (max-width: 910px)`]: {
                            display: 'none'},
                            [`@media (max-width: 412px)`]: {
                                padding: '25%'}
                    }}
                    alt="The house from the offer."
                    src={illustration}
                >
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;