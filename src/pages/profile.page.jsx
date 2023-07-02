import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import AvatarImg from "../data/man.png"
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const ProfileEditPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <Typography variant="h3"></Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={"center"}>
                  <Avatar sx={{ width: 200, height: 200 }}>
                    <img alt="profile" src={AvatarImg} />
                  </Avatar>
                </Grid>

                <Grid item xs={12}>
                  <TextField size="small" label="Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField size="small" label="Email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                <TextField
                size="small"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <p></p>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField size="small" label="Country" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button size="medium" variant="contained" fullWidth>
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button size="medium" variant="contained" fullWidth>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ProfileEditPage;