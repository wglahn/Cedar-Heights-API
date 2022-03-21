import {forwardRef, useEffect, useState, useContext} from 'react';
import { AppContext } from '../context/AppContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

export default function CustomizedSnackbars() {
  const [open, setOpen] = useState(false);
  const {alert, setAlert} = useContext(AppContext)
  
  useEffect(
      ()=>{
          setOpen(true)
        }
        ,[alert]
        )


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setAlert({})
  };

if(Object.keys(alert).length===0) return <></>

  return (

    <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        TransitionComponent={TransitionRight}
        message={<Alert severity={alert.cat} sx={{width:300 }}>{alert.msg}</Alert>}
      />
        
  );
}