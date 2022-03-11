
import React, {useEffect, useState} from 'react'
import {CssBaseline, Grid} from '@material-ui/core'

import Header from './Components/Header/Header'
import List from './Components/List/List'
import Map from './Components/Map/Map'

import { getPlacesData , getWeatherData} from './api'

const App = () => {
  const [places,setPlaces] =useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [weatherData, setWeatherData] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [isloading, setIsloading] = useState(null)
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(()=>{
    const filtered = places.filter((place)=> Number(place.rating)> Number(rating))
    setFilteredPlaces(filtered)
  },[rating])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((location)=>{
      setCoords({ lat: location.coords.latitude, lng: location.coords.longitude})
    })
  },[])

  useEffect(()=>{
    if (bounds.sw && bounds.ne){
      setIsloading(true)
      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type,bounds.sw , bounds.ne)
      .then((data)=>{
        //console.log(data)
        
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setRating('')
        setIsloading(false)
      })
    }  
  },[bounds, type])

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <CssBaseline>
      <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
      <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
          <List  
          places={filteredPlaces.length? filteredPlaces : places}
          isloading={isloading}
          childClicked={childClicked}
          type={type}
          rating={rating}
          setType={setType}
          setRating={setRating}
          />

        </Grid>
        <Grid item xs={12} md={8}>
          <Map
          setBounds={setBounds}
          setCoords={setCoords}
          coords={coords}
          places={filteredPlaces.length? filteredPlaces : places}
          setChildClicked={setChildClicked}
          weatherData={weatherData}
          >
            
          </Map>
        </Grid>
      </Grid>
    </CssBaseline>
  );
}

export default App;
