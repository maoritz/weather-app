import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import useWidth from './hooks/useWidth';
import Desktop from './components/Desktop';

function App() {
  const [weather, setWeather] = useState(null); // Current Weather Data
  const [forecast, setForecast] = useState(null); // Forecast Data
  const [city, setCity] = useState(''); // Update the city by the Searchbar
  const [timeOfDay, setTimeOfDay] = useState(''); // Update time in day by Searchbar
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [timezone, setTimezone] = useState(''); 

  // openMapWeather info
  const apiKey = '4709fe955e77e909213e5ddc5c4f3cf9';
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const apiForcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Set background color based on the time of day
  const setBackgroundColorByTime = () => {
    const dayBackgroundColor = 'bg-gradient-to-br from-yellow-300 via-blue-600 to-blue-700';
    const eveningBackgroundColor = 'bg-gradient-to-br from-blue-300 via-blue-800 to-blue-900';
    const nightBackgroundColor = 'bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950';

    if (timeOfDay === 'Evening') return eveningBackgroundColor;
    if (timeOfDay === 'Night') return nightBackgroundColor;
    return dayBackgroundColor;
  };

  // Handle city search event
  const handleCityChange = (event) => {
    setCity(event.target.value);
    event.preventDefault();
  };

  // Fetch user location and set default city
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setCity(response.data.city);
      } catch (err) {
        setError('Error fetching location');
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Fetch weather and forecast data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiWeatherUrl);
        const { coord, main, name, weather, timezone } = response.data;
        const data = {
          coordinates: coord,
          feelsLike: main.feels_like,
          humidity: main.humidity,
          temp: main.temp,
          maxTemp: main.temp_max,
          minTemp: main.temp_min,
          cityName: name,
          description: weather[0].description,
          iconCode: weather[0].icon,
          timezone: timezone, // Save timezone
        };
        setWeather(data);
        setTimezone(data.timezone); // Set timezone
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiForcastUrl);
        setForecast(response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchForecast();
    fetchWeather();
  }, [city]);

  // Calculate time of day based on city timezone
  useEffect(() => {
    const calculateTimeOfDay = async () => {
      if (!timezone) return;

      try {
        const now = new Date();

        // Get UTC time in milliseconds
        const utcOffset = now.getTimezoneOffset() * 60000;

        // Calculate local time using timezone offset (timezone is in seconds, convert to milliseconds)
        const localTime = new Date(now.getTime() + utcOffset + (timezone * 1000));

        // Get local hour
        const hour = localTime.getHours();
        console.log(hour);

        // Determine time of day based on local hour
        if (hour >= 5 && hour < 12) {
          setTimeOfDay('Morning');
        } else if (hour >= 12 && hour < 17) {
          setTimeOfDay('Afternoon');
        } else if (hour >= 17 && hour < 21) {
          setTimeOfDay('Evening');
        } else {
          setTimeOfDay('Night');
        }
      } catch (error) {
        console.error('Error calculating time of day:', error);
      }
    };

    calculateTimeOfDay();
  }, [weather, timezone]); // Ensure timezone is included in dependencies


  const { width } = useWidth();


  return (
    <>
      {width > 550 ? (
        <Desktop />
      ) : weather && forecast && timeOfDay && (
        <div className={`flex flex-wrap space-y-8 content-start justify-center p-8 min-h-screen ${setBackgroundColorByTime()}`}>
          <SearchBar value={city} onChange={handleCityChange} />
          <CurrentWeather
            temp={weather.temp}
            cityName={weather.cityName}
            description={weather.description}
            feelsLike={weather.feelsLike}
            icon={weather.iconCode}
          />
          <Forecast forecast={forecast} />
        </div>
      )}
    </>
  );
}

export default App;
