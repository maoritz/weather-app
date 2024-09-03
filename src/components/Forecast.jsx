import React from 'react'
import OneDayWeather from './OneDayWeather'

function Forecast( {forecast}) {
  return (
    <div className="grow bg-gray-900 text-white rounded-xl p-4 basis-8/12">
      <OneDayWeather  forecast={forecast}  />
    </div>
  )
}

export default Forecast