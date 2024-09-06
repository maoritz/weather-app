import { useState, useEffect } from 'react';
import OneDayWeather from './OneDayWeather';

function Forecast({ forecast }) {
  const [weatherDataByDate, setWeatherDataByDate] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
        const dailyData = {};

        forecast.list.forEach(item => {
          const date = item.dt_txt.split(" ")[0]; // Extract the date (YYYY-MM-DD)

          if (!dailyData[date]) {
            dailyData[date] = {
              date: date,
              minTemp: item.main.temp,
              maxTemp: item.main.temp,
              currentTemp: item.main.temp,
              feelsLike: item.main.feels_like,
              icon: item.weather[0].icon,
              description: item.weather[0].description
            };
  
          } else {
            // Update the min and max temperatures for the day
            dailyData[date].minTemp = Math.min(dailyData[date].minTemp, item.main.temp);
            dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp);
          }
          
        });


        // Convert the dailyData object into an array and set it to state
        setWeatherDataByDate(Object.values(dailyData));

    } catch (err) {
      console.error('Error processing forecast data:', err);
      setError('An error occurred while processing the weather data.');
    }
  }, [forecast]);

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message in UI
  }

  return (
    <div className="grow text-white rounded-xl p-1">
      {weatherDataByDate.length > 0 ? (
        weatherDataByDate.map((weatherObj, index) => {
          return <OneDayWeather key={index} forecast={weatherObj} />;
        })
      ) : (
        <div>No weather data available</div> // Placeholder for empty state
      )}
    </div>
  );
}

export default Forecast;
