import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherIcon from './components/WeatherIcon'
import FiveDays from './components/FiveDays'
import CurrentWeather from './components/CurrentWeather'
import useWidth from './hooks/useWidth'
import Desktop from './components/Desktop'

function App() {
  const [count, setCount] = useState(0)

  const {width} = useWidth()

  return (
    <>
      {width > 550 ? <Desktop /> : 
      <div className='flex flex-wrap space-y-8 content-start justify-center p-8 min-h-screen bg-gray-700'>
        <SearchBar />
        <WeatherIcon />
        <CurrentWeather />
        <FiveDays />
      </div>
}
    </>
  )
}

export default App
