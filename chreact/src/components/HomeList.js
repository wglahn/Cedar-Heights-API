import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useHomes from '../hooks/useHomes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const {homes} = useHomes();
  const navigate = useNavigate()


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ mx: 'auto', width: 1200, my: 5}}>
    <Grid container spacing={3}>
    {homes?.map((home) => (
    <Grid item xs={4} key={home.id}>
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        title={<>{home.year} {home.manufacturer} {home.model}</>}
      />
        <Carousel
          autoPlay={false}
          stopAutoPlayOnHover={true}
          >
            {
              home.images.map( (image) => 
                <Card key={image.id}>
                  <CardMedia
                      component="img"
                      height="200"
                      image={image.url}
                      alt={image.title}
                  />
                </Card>
                )
            }
        </Carousel>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Size: {home.size}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price: {home.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Box display="flex" justifyContent="flex-end">
        <IconButton  onClick={()=>{navigate('/Home/'+ home.id)}} justify="flex-end">
            <AspectRatioIcon />
        </IconButton>
      </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Location: {home.location}
          </Typography>
          <Typography paragraph>
            {home.desc}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
    ))}
    </Grid>
    </Box>
  );
}