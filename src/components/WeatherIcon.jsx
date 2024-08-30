import React from 'react'

function WeatherIcon() {
  return (
    <div className='basis-5/12'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="auto" height="auto">
      <circle cx="32" cy="32" r="12" fill="#FFD93B"/>
      <path d="M18.1 34.3c-4.7-4.3-4.3-11.4 1-15.1 4.5-3.1 10.9-2 14.1 2.3 4.8-2.5 10.8-.7 13.3 4.2 2.1 4 1.1 8.8-2.2 11.7h-26.2z" fill="#D1D1D1"/>
      <path d="M22.6 48.3H41.4c4.6 0 8.4-3.8 8.4-8.4s-3.8-8.4-8.4-8.4c-3.1 0-5.7 1.6-7.2 4h-9.2c-2.5 0-4.8 1-6.4 2.6-3.2 3.2-3.2 8.4 0 11.6 1.6 1.6 3.8 2.6 6.2 2.6z" fill="#A3A3A3"/>
      </svg>
    </div>
  )
}

export default WeatherIcon