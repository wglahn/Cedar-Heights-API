import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  {size:"10' x 20'",area:"200 sqft",door:"9'W x 8'H",price:"$65.00"},
  {size:"10' x 25'",area:"250 sqft",door:"9'W x 8'H",price:"$70.00"},
  {size:"12' x 20'",area:"240 sqft",door:"10'W x 13'H",price:"$75.00"},
  {size:"12' x 30'",area:"360 sqft",door:"10'W x 13'H",price:"$105.00"},
  {size:"12' x 50'",area:"600 sqft",door:"10'W x 13'H",price:"$165.00"},
];

export default function CustomizedTables() {
  return (
    <>
    <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>
     <Grid container sx={{ mx: 9, my: 5}}>
       <Grid item sx={{width:850}}>
          <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>
              <Typography variant="h4" sx={{display:"flex", alignContent:"center", justifyContent:"flex-start", width:'100%'}}>
                We offer mutliple options for your storage needs.  
                All units are equipped with an anti-drip roof lining,
                keeping your valuables safe from condensation.
              </Typography>
          </Box>
        </Grid>
    </Grid>
    </Box>
    <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>
    <Grid container spacing={2} sx={{ mx: 4, mb: 5}}>
      <Grid item >
            <Paper elevation={1} sx={{height:'320'}}>
          <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", width:'100%'}}>
              <img src='https://res.cloudinary.com/dslbd7ifs/image/upload/v1648090263/Cedar%20Heights/storage1_a6ogke.jpg' alt='storage units' height='320'/>
          </Box>
            </Paper>
      </Grid>
      <Grid item sx={{width: 500}}>
          <Box sx={{display:"flex", alignContent:"center", justifyContent:"flex-start", width:'100%'}}>
            <TableContainer component={Paper}>
              <Table  aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Size</StyledTableCell>
                    <StyledTableCell align="left">Area&nbsp;(sqft)</StyledTableCell>
                    <StyledTableCell align="left">Door Dimensions</StyledTableCell>
                    <StyledTableCell align="left">Price&nbsp;(per month)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.size}>
                      <StyledTableCell component="th" scope="row">
                        {row.size}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.area}</StyledTableCell>
                      <StyledTableCell align="left">{row.door}</StyledTableCell>
                      <StyledTableCell align="left">{row.price}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
      </Grid>
    </Grid>
    </Box>

    </>
  );
}
