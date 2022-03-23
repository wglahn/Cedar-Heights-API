import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import useHome from '../hooks/useHome';
import Carousel from 'react-material-ui-carousel'
import Typography from '@mui/material/Typography';

export default function Home() {
    const { id } = useParams();
    const {home} = useHome(id);
    const navigate = useNavigate()


  return (
    <>
    <Box  sx={{ mx: 'auto', width: 800, my: 5}}>
      <Paper elevation={24} sx={{mx:'auto',height: 700}}>
        <Typography variant="h4" color="text.secondary">
          <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:"100%"}}>
            {<>{home?.year} {home?.manufacturer} {home?.model}</>}
          </Box>
        </Typography>
          <Carousel
            autoPlay={true}
            stopAutoPlayOnHover={true}
            interval={8000}
            >
              {
                home?.images.map( (image) => 
                  <img src={image.url} alt={image.title} height='600'/>
                  )
              }
          </Carousel>
      </Paper>
    <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={()=>navigate('/HomeList/')} justify="flex-end">
            <CloseIcon />
        </IconButton>
    </Box>
    </Box>
    </>
  );
}
