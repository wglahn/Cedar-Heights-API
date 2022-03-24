import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function HomePage() {
    
  return (
    <Grid container spacing={4} sx={{ mx: 25, my: 10}}>
      <Grid item >
          <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:"100%"}}>
            <img src='https://res.cloudinary.com/dslbd7ifs/image/upload/v1648085588/Cedar%20Heights/vecttreesquare_sjllzz.png' alt='cedar icon' height='250'/>
          </Box>
      </Grid>
      <Grid item sx={{my: 7}}>
          <Typography variant="h2" sx={{display:"flex", alignContent:"center", justifyContent:"flex-start", width:"100%"}}>
            Welcome To Our Community
          </Typography>
          <Typography variant="h2" sx={{display:"flex", alignContent:"center", justifyContent:"flex-start", width:"100%"}}>
            Discover Your New Home
          </Typography>
      </Grid>
    </Grid>
  )
}

