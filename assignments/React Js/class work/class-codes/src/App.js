//import logo from './logo.svg';
import onBulb from './on-bulb.png';
import offBulb from './off-bulb.png';
import onBtn from './on-btn.png';
import offBtn from './off-btn.png';
import { useState } from 'react';
import './App.css';

function App() {
  // const name= "Hello World";
  // const obj= {name: "Hello World Object"};
  // const data=["We","Are","United"];
  // const list=[
  //   {name: "Hello World 1"},
  //   {name: "Hello World 2"},
  //   {name: "Hello World 3"},
  // ]

  // const complex = [
  //   {company: 'XYZ',
  //   jobs: ['javascript', 'React']},
    
  //   {company: 'ABC',
  //   jobs: ['Angular Js', 'Ionic']}, 
  //   ]


  const [bulb, setBulbOff]= useState(offBulb);
  const [btnBulb, setBtnBulb]= useState(offBtn);
  const [firstName, setFirstName]= useState("Danish");
  const [lastName, setLastName]= useState("Shaikh");
  const [shadow, setShadow]=useState("");
  const [colorShade, setColorShade]=useState("");
  function bulbToggle() {
   let bulbAction= bulb;
   let bulbBtnFace= btnBulb;


   if(bulbAction=== offBulb){
    setShadow("bulb-shadow");
    setColorShade("colorShade");
    setBulbOff(onBulb);
    setBtnBulb(onBtn);
   }else{
    setShadow("");
    setColorShade("");
    setBulbOff(offBulb);
    setBtnBulb(offBtn);
   }

  }

  return (
    <div className='web-bg'>
      <span className={colorShade}>{firstName}</span>
<div className="bulb-box" id={shadow}>
  <img src={setBulbOff && bulb} alt="Bulb"/>
  <img src={setBtnBulb && btnBulb}  onClick={bulbToggle} className='bulbBtn' alt="Bulb Btn"/>
  {/* <button onClick={bulbToggle}>Bulb Toggle</button> */}
</div>
<span className={colorShade}>{lastName}</span>
    </div>
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           {name} <br/>
//           {obj.name}
//           <ul>
//             {data.map(function (item) {
//               return <li>{item}</li>
//             })}
//           </ul>

//           {list.map(function(item) {
//             return <h3>{item.name}</h3>
//           })}

//         <table border="1">
// <tr>
//   <th>Company</th>
//   <th>Jobs</th>
// </tr>

// {complex.map(function (item) {
//   return <tr>
//     <td>{item.company}</td>
//     <td><ul>{
//     item.jobs.map(function (item) {
//       return <li>{item}</li>
//     })}</ul></td>
//   </tr>
// })}
//         </table>


//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
  );
}

export default App;
