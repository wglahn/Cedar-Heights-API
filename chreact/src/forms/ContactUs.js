import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Button from "../components/Button";
import Grid from '@mui/material/Grid';
import * as Yup from "yup";
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useCreateMessage from '../hooks/useCreateMessage';

const FormSchema = Yup.object({
    "name":Yup.string().required("Required"),
    "email":Yup.string().required("Required"),
    "phone":Yup.string().required("Required"),
    "msg":Yup.string().required("Required"),
})

export default function ContactUs() {
    const [newMessage, setNewMessage] = useState({})

    const initialValues={
        name: '',
        email: '',
        phone: '',
        msg: '',
    }

    useCreateMessage(newMessage);

    const handleSubmit =(values,resetForm)=>{
        if(values.name){
            setNewMessage(values)
            resetForm(initialValues);
        }

    }

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:FormSchema,
        onSubmit:(values, {resetForm})=>{handleSubmit(values, resetForm)},
        enableReinitialize:true

    })


  return (
    <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>
    <Grid container sx={{ mx: 9, my: 5}}>
        <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>
            <Grid item xs={4} sx={{width:850}}>
                <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%', mt: 12}}>
                    <Typography variant="h4" sx={{"fontWeight": 600}}>
                    Cedar Heights<br/>
                    1720 S. Washington Blvd.<br/>
                    Camanche, Iowa 52730<br/>
                    (563)259-8308<br/><br/>
                    M-F 8:00 AM to 5:00 PM
                    </Typography>
                </Box>
            </Grid>
            <Grid item sx={{ mx: 9, my: 0, width:425}}>
                <Paper elevation={1} sx={{width:'320', p:2}}>
                    <Typography variant="h6">
                        <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>    
                            What would you like to know more about?
                        </Box>
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            type="text"
                            sx={{ mb: 2, mt: 2 }}
                            label="Name"
                            placeholder=""
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            sx={{mb: 2 }}
                            type="text"
                            label="Email"
                            placeholder=""
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            />
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            sx={{mb: 2 }}
                            type="text"
                            label="Phone"
                            placeholder=""
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            />
                            <TextField
                                fullWidth
                                id="msg"
                                name="msg"
                                sx={{mb: 2 }}
                                type="text"
                                label="Message"
                                placeholder=""
                                multiline
                                rows={4}
                                value={formik.values.msg}
                                onChange={formik.handleChange}
                                error={formik.touched.msg && Boolean(formik.errors.msg)}
                                helperText={formik.touched.msg && formik.errors.msg}
                                />

                            <Button type="submit" sx={{ width: "100%", my:1 }}>Submit</Button>
                        </form>
                    </Paper>
                </Grid>
                {/* <Grid item >
                    <Paper elevation={1} sx={{height:'320'}}>
                        <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>
                            <img src='https://res.cloudinary.com/dslbd7ifs/image/upload/v1647915326/Cedar%20Heights/office2_kdxrjh.png' alt='storage units' height='320'/>
                        </Box>
                    </Paper>
                </Grid> */}
        </Box>
    </Grid>
    </Box>
           
      
  )
}
