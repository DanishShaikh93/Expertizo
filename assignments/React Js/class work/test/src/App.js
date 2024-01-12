import './App.css';
// import { useState } from 'react';
import Router from './config/router';


function App(props) {

  return (
    <div className="App">
      <header className="App-header">



        <h2>Header</h2>
        <Router/>
        <h2>Footer</h2>
        
      
        
        {
        // const [inputValue, setInputValue] = useState("");
// function updateText(event) {
//   const value=event.target.value;
//   setInputValue(value);
//   console.log(inputValue);
// }

// const [list, setList]= useState([]);
// function addItem() {
//   const copyList=[...list];
//   copyList.push(inputValue);
//   setList(copyList);
//   setInputValue("");
// }

// function deleteItem(index) {
//   console.log(index);
//   const copyList=[...list];
//   copyList.splice(index, 1);
//   setList(copyList);
// }
// const [editMode, setEditMode]=useState(false);
// const [currentItem, setCurrentItem]=useState();
// function editItem(index) {
//   const value = list[index];
//   setInputValue(value);
//   setEditMode(true);
//   setCurrentItem(index);
// }

// function updateItem() {
//   const copyList=[...list];
//   copyList[currentItem]=inputValue;
//   setList(copyList);
//   setEditMode(false);
// }

// function deleteAll(){
//   setList([]);
// }
        
        /* <button onClick={deleteAll}>Delete All</button>
       <input onChange={updateText} type="text" placeholder='Type any text' value={inputValue}/>
       {editMode 
      ? <button onClick={updateItem}>Update Item</button>
      : <button onClick={addItem}>Add Item</button>
      }

<ul>
  {list.map(function (item, index) {
    return <li>{item}
    <button onClick={()=> deleteItem(index)}>Delete</button>
    <button onClick={()=> editItem(index)}>Edit</button>
    </li>
  })}
</ul> */}

      </header>
    </div>
  );
}

export default App;
