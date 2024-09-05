import React from 'react'
import {formatTemp} from '../utils/formatTemp'

function CurrentWeather({cityName,description,feelsLike,temp}) {
  return (
  <div className="flex ml-auto bg-gray-900 text-white rounded-2xl p-5 w-40 text-center shadow-lg basis-6/12 flex-col justify-center">
    <div className="text-6xl font-bold text-2xl opacity-95 align-top ">
      {formatTemp(temp)}°
    </div>
    <div className="text-sm text-blue-300 mt-2">
      Feels like: {feelsLike}
    </div>
    <div className="text-sm text-blue-300 mt-2">
      {description} 
    </div>
    <div className="text-sm text-blue-300 mt-2">
      Weather in {cityName} 
    </div>
  </div>
  )
}

export default CurrentWeather