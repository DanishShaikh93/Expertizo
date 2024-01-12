import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './views/Header';
import Footer from './views/Footer';
import Homepage from './views/Homepage';
import Aboutpage from './views/Detail';
import Search from './views/Search';
import './App.css';
import loadingImg from "./images/loading.gif"
import { useState } from 'react';
import Detail from './views/Detail';


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
               <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ad-detail/:adId" element={<Detail />} />
        <Route path="/search-result/:adName" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
                </div>
}
       </>
  );
}

export default App;
