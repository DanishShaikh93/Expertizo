// import {
//     createBrowserRouter,
//     RouterProvider,
//   } from "react-router-dom";

//   import Homepage from "../views/Homepage";
//   import Detail from "../views/Detail";
//   import  Search  from "../views/Search";

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Homepage/>,
//     },
//     {
//         path: "/ad-detail/:adId",
//         element: <Detail/>,
//       },
//       {
//         path: "/search-result/:adName",
//         element: <Search/>
//       },


//   ]);

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../views/Header';
import Footer from '../views/Footer';
import Homepage from '../views/Homepage';
import Detail from '../views/Detail';
import Search from '../views/Search';
import Login from '../views/Login';
import Register from '../views/Register';
import AdPost from '../views/AdPost';

function MainRouter() {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ad-detail/:adId" element={<Detail />} />
            <Route path="/search-result/:adName" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ad-post" element={<AdPost />} />
        </Routes>
        <Footer />
    </Router>
}

  export default MainRouter;