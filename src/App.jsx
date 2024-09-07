import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import useWidth from './hooks/useWidth';
import Desktop from './components/Desktop';
import axios from 'axios';

function App() {
  // App main states
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Vancouver');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API key
  const apiKey = '4709fe955e77e909213e5ddc5c4f3cf9';
  
  const apiWeatherUrl = latitude && longitude
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const apiForecastUrl = latitude && longitude
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Set background by time
  const setBackgroundColorByTime = () => {
    const dayBackgroundColor = `bg-gradient-to-br from-yellow-300 via-blue-600 via-35% via-45% to-blue-700`;
    const eveningBackgroundColor = `bg-gradient-to-br from-blue-300 via-blue-800 to-blue-900`;
    const nightBackgroundColor = `bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950`;

    if (timeOfDay === 'Evening') return eveningBackgroundColor;
    if (timeOfDay === 'Night') return nightBackgroundColor;
    return dayBackgroundColor;
  };

  // Search for city event handling
  const handleCityChange = (event) => {
    setCity(event.target.value);
    setLatitude(null); // Reset latitude when user searches for a city
    setLongitude(null);
    event.preventDefault();
  };

  // Fetch data from OpenWeatherMap API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiWeatherUrl);
        const { coord, main, name, weather } = response.data;
        const data = {
          coordinates: coord,
          feelsLike: main.feels_like,
          humidity: main.humidity,
          temp: main.temp,
          maxTemp: main.temp_max,
          minTemp: main.temp_min,
          cityName: name,
          description: weather[0].description,
          iconCode: weather[0].icon
        };
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiForecastUrl);
        setForecast(response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWeather();
    fetchForecast();
  }, [city, latitude, longitude]);

  // Set the state of time of the day to manipulate background color
  useEffect(() => {
    const currentTime = new Date();
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 12) {
      setTimeOfDay('Morning');
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay('Afternoon');
    } else if (hour >= 17 && hour < 21) {
      setTimeOfDay('Evening');
    } else {
      setTimeOfDay('Night');
    }
  }, []);

  // Get user's location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
          // If location access is denied, fallback to city search
        }
      );
    }
  }, []);

  // Tell app what is the screen size for conditional rendering
  const { width } = useWidth();

  return (
    <>
      {width > 550 ? <Desktop /> : weather && forecast && timeOfDay &&
        <div className={`flex flex-wrap space-y-8 content-start justify-center p-8 min-h-screen ${setBackgroundColorByTime()}`}>
          <SearchBar value={city} onChange={handleCityChange} />
          <CurrentWeather temp={weather.temp} cityName={weather.cityName} description={weather.description} feelsLike={weather.feelsLike} icon={weather.iconCode} />
          <Forecast forecast={forecast} />
        </div>
      }
    </>
  );
}

export default App;
