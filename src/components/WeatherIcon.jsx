import React from 'react'

function WeatherIcon({iconCode}) {
  return (
    <div className='basis-5/12 flex justify-center items-center'>
      <img className='size-28 object-cover' src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} alt="Weather icon"/>
    </div>
  )
}

export default WeatherIcon