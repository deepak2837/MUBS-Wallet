import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar } from '@mui/material';

export const LoadingBackdrop = ({open})=> {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export const SnackbarAlert = ({open, msg, type, handleToastClose})=> {

  const vertical= 'top'
  const horizontal= 'center'

  return (
    <div>
      <Snackbar anchorOrigin={{vertical, horizontal}} open={open} autoHideDuration={2000} onClose={handleToastClose}>
          <Alert severity={type} sx={{ width: '100%' }} onClose={handleToastClose}>
              {msg}
          </Alert>
      </Snackbar>
    </div>
  );
}

