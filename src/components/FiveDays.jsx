import React from 'react'
import OneDayWeather from './OneDayWeather'

function FiveDays() {
  return (
    <div className="grow bg-gray-900 text-white rounded-xl p-4 basis-5/12">
      <OneDayWeather />
      <OneDayWeather />
      <OneDayWeather />
    </div>
  )
}

export default FiveDays