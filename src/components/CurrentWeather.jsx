import React from 'react'

function CurrentWeather() {
  return (
  <div class="flex ml-auto bg-gray-900 text-white rounded-2xl p-5 w-40 text-center shadow-lg basis-5/12 flex-col justify-center">
    <div class="text-6xl font-bold">
      18<span class="text-2xl opacity-70 align-top">/11°</span>
    </div>
    <div class="text-sm text-blue-300 mt-2">
      A sun with a cool
    </div>
  </div>
  )
}

export default CurrentWeather