import React from 'react'
import {formatTemp} from '../utils/formatTemp'

function OneDayWeather({forecast}) {
  console.log(forecast)
  const {date,description,icon,maxTemp,minTemp,currentTemp,feelsLike} = forecast

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700">
      <div className="text-3xl">
        <img className='size-28 object-cover' src={`http://openweathermap.org/img/wn/${icon}@2x.png`}  alt="Weather icon"/>
      </div>
      <div className="flex-grow ml-4">
        <div className="text-sm text-blue-300">{formatTemp(minTemp)}°</div>
        <div className="text-lg">{formatTemp(maxTemp)}°</div>
        <div className="text-lg">{description}</div>
      </div>
      <div className="text-xl">
        {formatTemp(currentTemp)}°
      </div>
    </div>
  )
}

export default OneDayWeather