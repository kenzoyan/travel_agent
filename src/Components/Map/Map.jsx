import React from 'react'

import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';
import mapStyles from './mapStyles'

const Map = (props) => {
  
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API}}
        defaultCenter={props.coords}
        center={props.coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e)=>{
          // console.log(e)
          props.setCoords({ lat: e.center.lat, lng: e.center.lng})
          props.setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child)=> {props.setChildClicked(child)}}
        >
          {props.places?.map((place,i)=>(
            <div 
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={ Number(place.longitude)}
              key={i}
            >
             {!matches
                ? <LocationOnOutlinedIcon color='primary' fontSize='large' />
                :(
                  <Paper elevation={3} className={classes.paper}>
                    <Typography gutterBottom variant="subtitle2" >
                      {place.name}
                    </Typography>
                    <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://picsum.photos/500' }
                    />
                    <Rating name="read-only"  size="small" value={Number(place.rating)} readOnly />
                  </Paper>   
                )
              } 
            </div>
          ))
          }
          {props.weatherData?.list?.length && props.weatherData.list.map((data, i) => (
                <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                  <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="100px" />
                </div>
              ))}
        </GoogleMapReact>
    </div>
  )
}

export default Map