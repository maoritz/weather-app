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
  const [city, setCity] = useState(''); // This will be updated by suggestion click
  const [searchTerm, setSearchTerm] = useState(''); // For typing in the SearchBar
  const [timeOfDay, setTimeOfDay] = useState(''); // Time of day
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [timezone, setTimezone] = useState(''); 
  const [suggestions, setSuggestions] = useState([]); // Location suggestions

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

  // Fetch location suggestions when the user types
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update searchTerm, not city
  
    if (value.length > 2) {
      const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };
  
  // Handle user selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setCity(`${suggestion.name}, ${suggestion.country}`); // Set city when suggestion is selected
    setSuggestions([]); // Clear suggestions after selection
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

  // Fetch weather and forecast data when `city` changes (after a suggestion is selected)
  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiWeatherUrl);
        const { coord, main, name, weather, timezone, wind, visibility } = response.data;
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
          wind: wind.speed,
          visibility: visibility
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
    const calculateTimeOfDay = () => {
      if (!timezone) return;

      const now = new Date();
      const utcOffset = now.getTimezoneOffset() * 60000;
      const localTime = new Date(now.getTime() + utcOffset + (timezone * 1000));
      const hour = localTime.getHours();

      if (hour >= 6 && hour < 17) {
        setTimeOfDay('day');
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay('Evening');
      } else {
        setTimeOfDay('Night');
      }
    };

    calculateTimeOfDay();
  }, [weather, timezone]);

  const { width } = useWidth();

  return (
    <>
      {width > 550 ? (
        <Desktop />
      ) : weather && forecast && timeOfDay && (
        <div className={`flex flex-wrap space-y-8 content-start justify-center p-5 min-h-screen ${setBackgroundColorByTime()}`}>
          <SearchBar 
            value={searchTerm} // Bind searchTerm to the input
            onChange={handleSearchChange}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
          <CurrentWeather weather={weather} />
          <Forecast forecast={forecast} />
        </div>
      )}
    </>
  );
}

export default App;
