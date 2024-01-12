import { useEffect, useState } from 'react';
import './App.css';
import PostsComponent from './components/PostsComponent';
// import Homepage from './views/Homepage'

function App() {
const [postData, setPostData] = useState([]);

useEffect(function(){
  getApiData();
},[])

function getApiData() {
  fetch('https://dummyjson.com/products')
  .then(res=> res.json())
  .then(res=> setPostData(res.products))
}

if(!postData.length){
  return <h2>Loading...</h2>
}

  return (
    <div className="App">
      <header className="App-header">
        
      <PostsComponent  allPosts={postData} myhd="My Heading"/>

      </header>
    </div>
  );
}

export default App;
