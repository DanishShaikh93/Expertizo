import {
  BrowserRouter as Router , Routes, Route
  } from "react-router-dom";

  import Register from "../Views/Register";
  import Login from "../Views/Login";
  import Dashboard from "../Views/Dashboard";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import AutocompleteLocationField from "../Views/AutoCompleteLocation";
import SearchLocation from "../Views/SearchLocation";


  

  function MainRouter() {
    return <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/location-search" element={<AutocompleteLocationField/>} />
        <Route path="/location-search-with-lib" element={<SearchLocation/>} />
      </Routes>
      <Footer/>
    </Router>
  }

  export default MainRouter;