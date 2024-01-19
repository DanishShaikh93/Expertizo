import './App.css';
import loadingImg from "./images/loading.gif"
import { useState } from 'react';
import MainRouter from '../src/config/router';


function App() {
  const [loading, setLoading] = useState(true); // State for controlling loader visibility

  const timer = setTimeout(() => {
    setLoading(false); // Set loading to false after 3 seconds
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, 2000);

  

  return (
         <>
          {loading  
          ? <div className='loadingSec'><img src={loadingImg} alt="Loading..." /></div>
                : <div>
                  
               <MainRouter/>
     
                </div>
}
       </>
  );
}

export default App;
