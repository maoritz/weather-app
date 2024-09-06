import React from 'react'
import {formatTemp} from '../utils/formatTemp'

function OneDayWeather({forecast}) {
  const {date,description,icon,maxTemp,minTemp} = forecast

  return (
    <div className="flex items-center justify-between py-3 border-b">
      <div className="text-4xl">
        <img className='size-28 object-cover' src={`http://openweathermap.org/img/wn/${icon}@2x.png`}  alt="Weather icon"/>
      </div>
      <div className="flex-grow ">
        <div className="ml-2">{description}</div>
      </div>
      <div className="mr-auto">
        <div className="mb-1">{date}</div>
        <div className="text-blue-300">L: {formatTemp(minTemp)}°</div>
        <div>H: {formatTemp(maxTemp)}°</div>
      </div>
    </div>
  )
}

export default OneDayWeather