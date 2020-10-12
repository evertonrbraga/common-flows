import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const getWeather = async (lat, long) => {
    const res = await axios.get(
      'http://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_KEY,
          lang: 'pt',
          units: 'metric',
        },
      }
    );
    setWeather(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location === false) {
    return <ClipLoader size={50} />;
  } else {
    return (
      <>
        <h3>Clima nas suas Coordenadas (Exemplo)</h3>
        <hr />
        <ul>
          <li>Temperatura atual: x</li>
          <li>Temperatura máxima: x</li>
          <li>Temperatura mínima: x</li>
          <li>Pressão: x hpa</li>
          <li>Umidade: x%</li>
        </ul>
      </>
    );
  }
}

export default App;
