import React from 'react'
import {formatTemp} from '../utils/formatTemp'
import {formatDate} from '../utils/formatDate'

function OneDayWeather({forecast}) {
  const {date,description,icon,maxTemp,minTemp} = forecast

  return (
    <div className="flex items-center py-3 border-b ">
      <div className="mr-2">
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}  alt="Weather icon"/>
      </div>
      <div className="flex-grow ">
        <div className="mr-2">{description}</div>
      </div>
      <div className="text-sm">
        <div className="mb-2">{formatDate(date)}</div>
        <div className="text-blue-300 text-sm">L: {formatTemp(minTemp)}°</div>
        <div>H: {formatTemp(maxTemp)}°</div>
      </div>
    </div>
  )
}

export default OneDayWeather