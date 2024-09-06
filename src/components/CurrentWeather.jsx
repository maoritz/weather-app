import React from 'react'
import {formatTemp} from '../utils/formatTemp'

function CurrentWeather({cityName,description,feelsLike,temp,icon}) {
  return (
    <div className="flex basis-11/12 text-white rounded-2xl text-center shadow-lg justify-center bg-gray">
      <div className='flex justify-center items-center'>
        <img className='size-28 object-cover' src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon"/>
      </div>
      <div className="flex ml-auto text-white rounded-2xl p-5 w-40 text-center basis-6/12 flex-col justify-center">
       <div className="text-2xl text-blue-100 mt-2">
          {cityName} 
        </div>
        <div className="text-5xl font-bold text-2xl opacity-95 align-top mt-3">
          {formatTemp(temp)}°
        </div>
        <div className="text-lg text-blue-200 mt-1">
          {description} 
        </div>
        <div className="text-s text-blue-200 mt-1">
          Feels like: {formatTemp(feelsLike)}
        </div>
    </div>
  </div>
  )
}

export default CurrentWeather