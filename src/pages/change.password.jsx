import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Grid,
  Typography,
  Stack,
  Button
} from "@mui/material";
import Lock from "../data/padlock.png"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const ChangePassword = () => {

    const navigate = useNavigate()
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <Container maxWidth="sm">
          <Card elevation={5} sx={{padding: 2, borderRadius: 5}}>
            <CardContent>
              <Typography variant="h5" textAlign="center">Change Password </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={"center"}>
                    <img alt="profile" src={Lock} width={200} height={200}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField size="small" label="Current Password" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                </Grid>
               
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Stack direction="row" spacing={5}  justifyContent="center" mt={4}>
                <Button variant="contained" onClick={()=> navigate(-1)}>
                    Back
                </Button>
                <Button variant="contained">
                    Submit
                </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ChangePassword;