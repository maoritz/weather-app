import React from 'react'
import {formatTemp} from '../utils/formatTemp'
import {formatDate} from '../utils/formatDate'
import { convertAPIIconsToLocal } from '../utils/convertAPIIconsToLocal'

function OneDayWeather({forecast}) {
  const {date,description,icon,maxTemp,minTemp} = forecast

  return (
    <div className="flex items-center py-3 border-b">
      <div className="mr-2">
        <img src={`public/${convertAPIIconsToLocal(icon)}.png`}  alt="Weather icon"/>
      </div>
      <div className="flex-grow">
        <div className="mr-2">{description}</div>
      </div>
      <div className="text-sm">
        <div className="text-lg mb-2">{formatDate(date)}</div>
        <div className="text-blue-200">L: {formatTemp(minTemp)}°</div>
        <div>H: {formatTemp(maxTemp)}°</div>
      </div>
    </div>
  )
}

export default OneDayWeather