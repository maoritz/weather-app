import React from 'react'

function OneDayWeather({forecast}) {
  console.log(forecast.list)
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700">
      <div className="text-3xl">
        <img className='size-28 object-cover' src={`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`} alt="Weather icon"/>
      </div>
      <div className="flex-grow ml-4">
        <div className="text-sm text-blue-300">{forecast.list[0].dt_txt}</div>
        <div className="text-lg">{forecast.list[0].weather[0].description}</div>
      </div>
      <div className="text-xl">
        {forecast.list[0].main.temp}° 
      </div>
    </div>
  )
}

export default OneDayWeather