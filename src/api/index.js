import axios from "axios";

export const getPlacesData = async (type, bottomLeft,topright) => {
    
    const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    const options = {
        params: {
          bl_latitude: bottomLeft.lat,
          tr_latitude: topright.lat,
          bl_longitude: bottomLeft.lng,
          tr_longitude: topright.lng,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
        }
      };
    try {
        const {data: {data}} = await axios.get(URL, options);

        return data

    } catch (error) {
        console.log(error)
    }
}

export const getWeatherData = async (lat,lon) => {
    
  const URL = 'https://community-open-weather-map.p.rapidapi.com/find'

  const options = {
    params: {
      lat:lat, 
      lon: lon,
      
    },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
    }
  };
  console.log('options', options)
  try {
     if (lat && lon){
      const {data} = await axios.get(URL, options);
      console.log('data', data)
      return data
     }
  } catch (error) {
      console.log(error)
  }
}


