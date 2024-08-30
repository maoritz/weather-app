import { useState } from 'react'
import SearchBar from './components/SearchBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex p-4 min-h-screen justify-center bg-gray-700'>
         <SearchBar />
      </div>

    </>
  )
}

export default App
