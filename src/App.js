
import './App.css';
import './index.css'
import Search from './components/search/search'
import CurrentWeather from './components/search/currnt-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { weather_API_KEY, weather_API_URL } from './api';
import { useState } from 'react';

function App() {

  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecast,setForecast] = useState(null);


  const handleOnSearchChange = (searchData) =>{

    const [lat,lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${weather_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${weather_API_KEY}&units=metric`);
    const forcastFetch = fetch(`${weather_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${weather_API_KEY}`);

    Promise.all([currentWeatherFetch,forcastFetch])
    .then(async (response) => {
      const weatherResponce = await response[0].json();
      const forecastResponce = await response[1].json();

      setCurrentWeather({ city : searchData.label, ...weatherResponce});
      setForecast({city : searchData.label, ...forecastResponce});
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  // console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
