import React from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import Button from "../components/Button";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import useImages from '../hooks/useImages';
import useCreateImage from '../hooks/useCreateImage';
import useDeleteImage from '../hooks/useDeleteImage';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

const FormSchema = Yup.object({
    "title":Yup.string().required("Required"),
    "order":Yup.number().required("Required"),
    "url":Yup.string().required("Required"),
    "home_id":Yup.number().integer().required("Required")
})

export default function HomeForm() {
    const {images} = useImages();


    const [listClick, setListClick] = useState({})
    const [newImage, setNewImage] = useState({})
    const [deleteImage, setDeleteImage] = useState({})

    useCreateImage(newImage)
    useDeleteImage(deleteImage)

    const initialValues={
        id:listClick?.id ?? '',
        title:listClick?.title ?? '',
        order:listClick?.order ?? '',
        url:listClick?.url ?? '',
        home_id:id
    }

    const handleSubmit =(values,resetForm)=>{
            setNewImage(values);
            setListClick({})
            resetForm(initialValues);
    }

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:FormSchema,
        onSubmit:(values, {resetForm})=>{handleSubmit(values, resetForm)},
        enableReinitialize:true

    })
        
    const handleDelete=()=>{
        setDeleteImage(listClick)
        setListClick({})
    }

    const handleListItemClick = (image) => {
        setListClick(image)
    };

  return (
    <Box sx={{ mx: 'auto', width: 1200, my: 5}}>
        <Paper elevation={3} sx={{p:2}}>
            
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box sx={{ border:1, mt:2, width: '100%', maxWidth: 1200, bgcolor: 'background.paper' }}>
                        <List component="nav" aria-label="secondary mailbox folder">
                            {images?.map((image) => (
                            <ListItemButton
                                key={image.id}
                                // selected={homeImages === image.id}
                                onClick={() => handleListItemClick(image)}
                            >
                                {image.title} - {image.url}
                            </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Grid>

                <Grid item xs={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            type="text"
                            sx={{ mb: 2, mt: 2 }}
                            label="Title"
                            placeholder=""
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            fullWidth
                            id="url"
                            name="url"
                            sx={{mb: 2 }}
                            type="text"
                            label="URL"
                            placeholder=""
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            error={formik.touched.url && Boolean(formik.errors.url)}
                            helperText={formik.touched.url && formik.errors.url}
                        />
                        <TextField
                            fullWidth
                            id="order"
                            name="order"
                            sx={{mb: 2 }}
                            type="text"
                            label="Order"
                            placeholder=""
                            value={formik.values.order}
                            onChange={formik.handleChange}
                            error={formik.touched.order && Boolean(formik.errors.order)}
                            helperText={formik.touched.order && formik.errors.order}
                        />


                        <Button type="submit" sx={{ width: "100%", my:1 }}>Save New Image</Button>
                    </form>
                </Grid>
                <Grid item xs={4}>
                        <Box sx={{ mt:2, width: '100%', bgcolor: 'background.paper' }}>
                    <Card >
                        <CardMedia
                            component="img"
                            height="200"
                            image={listClick.url}
                            alt={listClick.title}
                        />
                    </Card>
                        <Button color="error" onClick={()=>handleDelete()} sx={{width:"100%", my:3}}>Delete Image</Button>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={()=>navigate('/HomeForm/')} justify="flex-end">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    </Box>
  )
}