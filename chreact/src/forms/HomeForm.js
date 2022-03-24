import React from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import Button from "../components/Button";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import useHomes from '../hooks/useHomes';
import useCategories from '../hooks/useCategories';
import useCreateHome from '../hooks/useCreateHome';
import useEditHome from '../hooks/useEditHome';
import useDeleteHome from '../hooks/useDeleteHome';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const FormSchema = Yup.object({
    "vin":Yup.string().required("Required"),
    "manufacturer":Yup.string().required("Required"),
    "model":Yup.string().required("Required"),
    "size":Yup.string().required("Required"),
    "location":Yup.string(),
    "price":Yup.string(),
    "desc":Yup.string(),
    "year":Yup.number(),
    "category_id":Yup.number().integer().required("Required")
})

export default function HomeForm() {
    const {categories, catError} = useCategories();
    const {homes} = useHomes();
    const navigate = useNavigate()

    const [newHome, setNewHome] = useState({})
    const [editHome, setEditHome] = useState({})
    const [deleteHome, setDeleteHome] = useState({})
    const [listClick, setlistClick] = useState({})
    const [homeList, setHomeList] = useState([])

    useCreateHome(newHome)
    useEditHome(editHome)
    useDeleteHome(deleteHome)

    React.useEffect(()=>{
        setHomeList(homes)
    },[homes])

    React.useEffect(()=>{
        if(deleteHome?.vin){
            setHomeList(
                homeList.filter((home)=>home.vin !== deleteHome.vin)
            )
            };
    },[deleteHome.vin,homeList])

    const initialValues={
        id:listClick?.id ?? '',
        vin:listClick?.vin ?? '',
        manufacturer:listClick?.manufacturer ?? '',
        model:listClick?.model ?? '',
        size:listClick?.size ?? '',
        location:listClick?.location ?? '',
        price:listClick?.price ?? '',
        desc:listClick?.desc ?? '',
        year:listClick?.year ?? '',
        category_id:listClick?.category_id ?? ''
    }

    const handleSubmit =(values,resetForm)=>{
        if(listClick.id){
            setEditHome(values);
        }else {
            setNewHome(values);
            resetForm(initialValues);
            setHomeList([...homeList,values]);
        }
    }

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:FormSchema,
        onSubmit:(values, {resetForm})=>{handleSubmit(values, resetForm)},
        enableReinitialize:true

    })
        
    const handleDelete=()=>{

        setDeleteHome(listClick);

    }

    const handleListItemClick = (selected_home) => {
        setlistClick(selected_home);
    };

  return (
    <Box sx={{ mx: 'auto', width: 900, mt: 5}}>
        <Paper elevation={3} sx={{p:2}}>
            
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Box sx={{ border:1, mt:2, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                        <List component="nav" aria-label="secondary mailbox folder">
                            {homeList?.map((select_home) => (
                            <React.Fragment key={JSON.stringify(select_home.id)+'e'}>
                            <Grid key={JSON.stringify(select_home.id)+'d'} container sx={{ display: 'flex', alignItems: 'center'}}>
                                <ListItemButton
                                    key={JSON.stringify(select_home.id)+'a'}
                                    selected={editHome === select_home.id}
                                    onClick={() => handleListItemClick(select_home)}
                                >
                                    {select_home.manufacturer} {select_home.model} - {select_home.vin}
                                </ListItemButton>
                                <IconButton color="primary" aria-label="pictures" component="span" key={JSON.stringify(select_home.id)+'b'} onClick={()=>{navigate('/ImageForm/'+ select_home.id)}}>
                                    <PhotoCamera key={JSON.stringify(select_home.id)+'c'}/>
                                </IconButton>
                            </Grid>
                            </React.Fragment>
                            ))}
                        </List>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="vin"
                            name="vin"
                            type="text"
                            sx={{ mb: 2, mt: 2 }}
                            label="VIN"
                            placeholder=""
                            value={formik.values.vin}
                            onChange={formik.handleChange}
                            error={formik.touched.vin && Boolean(formik.errors.vin)}
                            helperText={formik.touched.vin && formik.errors.vin}
                        />
                        <TextField
                            fullWidth
                            id="manufacturer"
                            name="manufacturer"
                            sx={{mb: 2 }}
                            type="text"
                            label="Manufacturer"
                            placeholder=""
                            value={formik.values.manufacturer}
                            onChange={formik.handleChange}
                            error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer)}
                            helperText={formik.touched.manufacturer && formik.errors.manufacturer}
                        />
                        <TextField
                            fullWidth
                            id="model"
                            name="model"
                            sx={{mb: 2 }}
                            type="text"
                            label="Model"
                            placeholder=""
                            value={formik.values.model}
                            onChange={formik.handleChange}
                            error={formik.touched.model && Boolean(formik.errors.model)}
                            helperText={formik.touched.model && formik.errors.model}
                        />
                        <TextField
                            fullWidth
                            id="year"
                            name="year"
                            sx={{mb: 2 }}
                            type="text"
                            label="Year"
                            placeholder=""
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            error={formik.touched.year && Boolean(formik.errors.year)}
                            helperText={formik.touched.year && formik.errors.year}
                        />
                        <TextField
                            fullWidth
                            id="size"
                            name="size"
                            sx={{mb: 2 }}
                            type="text"
                            label="Size"
                            placeholder=""
                            value={formik.values.size}
                            onChange={formik.handleChange}
                            error={formik.touched.size && Boolean(formik.errors.size)}
                            helperText={formik.touched.size && formik.errors.size}
                        />
                        <TextField
                            fullWidth
                            id="location"
                            name="location"
                            sx={{mb: 2 }}
                            type="text"
                            label="Location"
                            placeholder=""
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            sx={{mb: 2 }}
                            type="text"
                            label="price"
                            placeholder=""
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField
                            fullWidth
                            id="desc"
                            name="desc"
                            sx={{mb: 2 }}
                            type="text"
                            label="Description"
                            placeholder=""
                            multiline
                            rows={4}
                            value={formik.values.desc}
                            onChange={formik.handleChange}
                            error={formik.touched.desc && Boolean(formik.errors.desc)}
                            helperText={formik.touched.desc && formik.errors.desc}
                        />

                        <FormControl sx={{  width: "100%" }}>
                            <InputLabel id="category-label-id">Category</InputLabel>
                            <Select
                                labelId="category-label-id"
                                id="category-id"
                                value={formik.values.category_id}
                                name="category_id"
                                label="Category"
                                placeholder="Category"
                                onChange={formik.handleChange}
                                error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                            >
                                {categories?.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                            {catError}
                            <FormHelperText>{formik.touched.category_id && formik.errors.category_id}</FormHelperText>
                        </FormControl>

                        <Button type="submit" sx={{ width: "100%", my:1 }}>Save Home</Button>
                        <Button color="error" onClick={()=>handleDelete()} sx={{width:"100%", my:1}}>Delete Home</Button>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    </Box>
  )
}
