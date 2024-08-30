import {useEffect, useState} from 'react';

const useWidth = () => {
    // Initialize state with the window width
    const [windowSize, setWindowSize] = useState({width: window.innerWidth});

    // Handler to call on window resize
    const changeWindowSize = () => {
            setWindowSize({width: window.innerWidth})
    }

    useEffect(()=> {
        // Add resize event listener
        window.addEventListener('resize', changeWindowSize)

        // Remove event listener on cleanup
        return ()=> window.removeEventListener('resize', changeWindowSize)
    },[])
    return windowSize
}

export default useWidth