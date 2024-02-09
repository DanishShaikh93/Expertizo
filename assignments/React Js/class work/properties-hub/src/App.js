// import logo from './logo.svg';
import './App.css';
// import { useState } from 'react';
import MainRouter from './config/router';
import store from './Store';
import { Provider } from 'react-redux';


function App() {

  return( 
  <Provider store={store}>
  <MainRouter/> 
  </Provider>
  )
  
}

export default App;
