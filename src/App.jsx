import { useState,useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherIcon from './components/WeatherIcon'
import Forecast from './components/Forecast'
import CurrentWeather from './components/CurrentWeather'
import useWidth from './hooks/useWidth'
import Desktop from './components/Desktop'
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Vancouver');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '4709fe955e77e909213e5ddc5c4f3cf9'
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const apiForcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  
  const {width} = useWidth()

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiWeatherUrl)
        const {coord,main,name,weather} = response.data
        const data = {
          coordinates:coord,
          feelsLike:main.feels_like,
          humidity:main.humidity,
          temp:main.temp,
          maxTemp:main.temp_max,
          minTemp:main.temp_min,
          cityName:name,
          description:weather[0].description,
          iconCode:weather[0].icon
        };
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchForecast = async () => {
      try{
        setLoading(true)
        const response = await axios.get(apiForcastUrl)
        setForecast(response.data)
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchForecast()
    fetchWeather();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
    event.preventDefault();
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching weather data: {error.message}</p>;

  return (
    <>
      {width > 550 ? <Desktop /> : weather && forecast &&
      <div className='flex flex-wrap space-y-8 content-start justify-center p-8 min-h-screen bg-gray-700'>
        <SearchBar  value={city} onChange={handleCityChange} />
        <WeatherIcon iconCode={weather.iconCode} />
        <CurrentWeather temp={weather.temp}  cityName={weather.cityName} description={weather.description} feelsLike={weather.feelsLike}/>
        <Forecast  forecast={forecast} />
      </div>
      }
    </>
  )
}

export default App
