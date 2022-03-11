import React ,{useState, createRef, useEffect} from 'react'
import { Grid, Typography, InputLabel, MenuItem, FormControl, Select, CircularProgress } from '@material-ui/core';

import ItemDetails from '../ItemDetails/ItemDetails'
import useStyles from './styles.js';


const List = (props) => {
  const classes = useStyles()
  

  const [elRefs, SetElRefs] = useState([])
  
  useEffect(()=>{
    SetElRefs((Refs)=> Array(props.places.length).fill().map((_,i)=> Refs[i]||createRef()));
  },[props.places])
  return (
    <div className={classes.container}> 
        <Typography variant='h4'> Find your favourite around</Typography>
        {props.isloading?(
          <div className={classes.loading}>
              <CircularProgress size='5rem'/>
          </div>
          
        ):(
          <div>
          <FormControl className={classes.formControl} >
              <InputLabel id='type'>Type</InputLabel>
              <Select id='type' value={props.type} onChange={(e)=> props.setType(e.target.value)}>
                <MenuItem value='restaurants'>Restaurants</MenuItem>
                <MenuItem value='attractions'>Attractions</MenuItem>
                <MenuItem value='hotels'>Hotels</MenuItem>
              </Select>
          </FormControl>
          <FormControl className={classes.formControl} >
              <InputLabel id='rating'>Rating</InputLabel>
              <Select id='rating' value={props.rating} onChange={(e)=> props.setRating(e.target.value)}>
                <MenuItem value='0'>All</MenuItem>
                <MenuItem value='3'>Above 3.0</MenuItem>
                <MenuItem value='4'>Above 4.0</MenuItem>
              </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
          {props.places?.map((place,i)=>(
            <Grid  ref={elRefs[i]} item key={i} xs={12}>
              <ItemDetails place={place} selected={Number(props.childClicked)===i} refProp={elRefs[i]} />
            </Grid>
          ))}

          </Grid>
        </div>
        )}
        
    </div>
  )
}

export default List