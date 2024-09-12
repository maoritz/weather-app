import React from 'react'
import {formatTemp} from '../utils/formatTemp'
import { convertAPIIconsToLocal } from '../utils/convertAPIIconsToLocal'

function CurrentWeather({weather}) {
    const {cityName,visibility,humidity,wind,description,feelsLike,temp,iconCode} = weather
    const convertMpsToKph = () => Math.round(wind * 3.6)
    const visibilityInKm = () => (visibility / 1000).toFixed(1); 
    
  return (
    <div className="flex grow text-white rounded-2xl shadow-lg justify-center pl-2 pr-2 pt-5 pb-5">
      <div className="flex flex-col ">
        <div>
          Now
        </div>
        <div className='flex justify-center items-center'>
          <div className="text-5xl opacity-95 align-top">
            {formatTemp(temp)}°
          </div>
          <img className='size-11' src={`public/${convertAPIIconsToLocal(iconCode)}.png`} alt="Weather Icon"/>
        </div>
        <div className="text-sm mt-1">
          Feels like: {formatTemp(feelsLike)}
        </div>
      </div>
      <div className="flex text-white justify-center items-end rounded-2xl basis-6/12 flex-col justify-center">
        <div className='text-sm'>
          <div className="text-xl text-blue-200 mb-2">
            {description} 
          </div>
          <div>
            Wind: {convertMpsToKph()} km/h
          </div>
          <div>
            Humidity: {humidity}%
          </div>
          <div>
            Visibility: {visibilityInKm()} km
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather