import logo from './logo.svg';
import './App.css';
import Dashboard from './views/Dashboard';
import AboutUs from './views/AboutUs';
import ContactUs from './views/ContactUs';
import { useState } from 'react';

function App() {
const [screen, setScreen] = useState('dashboard');

const updateScreen= (currentScreen)=>{
setScreen(currentScreen);
}

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=> updateScreen('dashboard')}>Dashboard</button>
        <button onClick={()=> updateScreen('aboutUs')}>About Us</button>
        <button onClick={()=> updateScreen('contactUs')}>Contact Us</button>
        {screen === 'dashboard' && <Dashboard/>}
        {screen === 'aboutUs' && <AboutUs/>}
        {screen === 'contactUs' && <ContactUs/>}
       
      </header>
    </div>
  );
}

export default App;
