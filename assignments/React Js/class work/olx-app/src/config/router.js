
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Header from '../views/Header';
import Footer from '../views/Footer';
import Homepage from '../views/Homepage';
import Detail from '../views/Detail';
import AdDetail from '../views/AdDetail';
import Search from '../views/Search';
import Login from '../views/Login';
import Register from '../views/Register';
import AdPost from '../views/AdPost';
import EditProfile from '../views/EditProfile';
import Profile from '../views/Profile';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; // Import your Firebase authentication instance


function MainRouter() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
  
      // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      // You might want to display a loading spinner or some indication that authentication is in progress
      return <div>Loading...</div>;
    }
  
    const PublicRoute = ({ element }) => (!user ? element : <Navigate to="/" />);
    const PrivateRoute = ({ element }) => (user ? element : <Navigate to="/login" />);
  

    return <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ad-detail/:adId" element={<Detail />} />
        <Route path="/ad-details/:adId" element={<AdDetail />} />
        <Route path="/search-result/:adName" element={<Search />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/ad-post" element={<PrivateRoute element={<AdPost />} />} />
        <Route path="/edit-profile" element={ <PrivateRoute element={<EditProfile />} />} />
        <Route path="/profile" element={ <PrivateRoute element={<Profile />} />} />
      </Routes>
        <Footer />
    </Router>
}

  export default MainRouter;


//   useEffect(()=>{
//     onAuthStateChanged(auth, (user) => {
//         //setUser();
//     })
//   },[])

//   useEffect(()=>{
// const {pathname} = window.location;


// if(user){
//     if(pathname === "/login" || pathname === "/register"){
//         Navigate("/");
//     }else{
//         if(pathname === "/postAds"){
//             Navigate("/login");
//         }
//     }
// }

//   }, [window.location.pathname, user]);