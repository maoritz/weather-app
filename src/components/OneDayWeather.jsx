import React from 'react'

function OneDayWeather() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700">
      <div className="text-3xl">
        🌧️
      </div>
      <div className="flex-grow ml-4">
        <div className="text-sm text-blue-300">Tomorrow</div>
        <div className="text-lg">Rain</div>
      </div>
      <div className="text-xl">
        11° / 18°
      </div>
    </div>
  )
}

export default OneDayWeather