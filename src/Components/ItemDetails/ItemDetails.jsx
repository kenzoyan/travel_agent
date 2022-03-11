import React from 'react'

import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js'

const ItemDetails = (props) => {

  if (props.selected) props.refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  const classes = useStyles();
  const place = props.place
  return (
    <Card elevation={6}>
      <CardMedia
        component="img"
        height="140"
        image={place.photo? place.photo.images.large.url : 'https://picsum.photos/500' }
        alt="Item Photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          {place.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
          {place.address}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>TripAdvisior</Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>Our Website</Button>
      </CardActions>
    </Card>
  )
}

export default ItemDetails