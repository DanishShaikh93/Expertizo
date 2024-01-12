import './App.css';
import profilePic from './danish.jpeg'
import { useState } from 'react';

function App() {

  ///STEP 01
  //jab input field mein koi value put ho gea wo is state mein save ho jaye gea.  
  const [inputValue, setInputValue] = useState();



  //new function for getting all input values with help of onchange ye function lagey ga q k jb us field mein kuch bhi change ho ga tou hum is function mein kahen gy k usey input ki jo state hai state(inputValue) us mein us value ko save krwa den.
  function updatedTxt(event) {
    //event.target.value k ander humein input ki value mil jaye gea jab bhi change ho gea aur hum usey ek variable mein save krwa kr us variable ko state mein save krwa den gy jo hum ne input field k liye create ki hai state(inputValue) k name se.
    const value = event.target.value;
    //console.log(value);
    //yahan hum input ki value ko state(inputValue) mein save krwa den takey hum usey doosey function mein bhi access kr sakey 
    setInputValue(value)
  }


  //Ab humare pass input se value aa rhi hai jab bhi user kuch input mein type kar rha hai onchange k function ki help se aur updatedTxt() k fcuntion mein usey hum ne console bhi kr k dekh lia hai ab hum step 2 pr jayen gy q k ab user type krne k baad item add krne k liye button press kre ga "add item" aur phir humara new function chalega jo value humare paas aa chuki hai JSX se ab hum usey state(list) k array mein push krwa den gy us k liye pehle hum list name se ek state bana letey hen takey us mein one by one jese jese input se user ki value aati rahe aur humare new function se humri state(list) mein push hoti rahe is liye pehle hum "list" name se ek new state bana len gy.


  //STEP 02
  //State for save all list items jo humein "inputValue" ki state mein recieve ho rhi hai.
  const [list, setList] = useState([]);

  function addItem() {
    //PURPOSE: Humein is function mein input ki value ko state(list) k blank array mein push krwana hai 
    //Mojod Cheezen: state(list) ka vaiable mojod hai aur input se value bhi aa rhi hai inputValue ki state mein aur humein ab inputValue ki current value "List" ki state mein push krwani hai.
    //Note: "list" ek state banyi hai hum ne aur us ko hum directly access nahi kr saktey q k "States are directly immutable means directly change nhi ho sakti is liye hum us state ki ek copy nikal len gy aur us mein value push krwayen gy"

    //hume is tarha direct state mein change ya push nhi kr saktey
    //list.push(inputValue);

    //islye copy state baney gy
    //but us copy ko directly braber nahi kr saktey hen is tarha "const copyList= list" q k humari orginal state k refrence same ho jaye ga aur humein reference bhi alag alag rakhna hai q k states are directly immutable to hum yaha spread operator [...] use kren gy q k ye ek array k ander se values utha kr dusre array mein just us ki values add krta hai but dono k abbu alag alag hi rahen gy but sirf values merge ho jayen gea dono ki.
    const copyList = [...list];
    copyList.push(inputValue);
    setList(copyList);
    //console.log(list);
    setInputValue("");
  }


  //STEP 3
  //Delete function baney ga jese hi user list item mein se ksi bhi item k delete button pr click kre ga jo loop mein show ho rha hai har item k sath tou us ka currect index humein wahan se mil jaye ga aur usi index ki value ko hum jo "list" state mein save hai specific usi value ko hum "list" state array mein se splice kr den gy.
  function deleteItem(index) {
    //again hum directly list ki state ko nahi cheydengy q k states are directly immutable again hum state ki copy banaye k aur hum us mein se splice kren gy requested index ko.
    const copyList = [...list];
    copyList.splice(index, 1);
    setList(copyList);
    setInputValue("");
  }



  //STEP 04
  //user k liye edit ka function banayen gy jo items user ne add kiye hen "list" ki state mein un mein se ksi item ko agar update krna ho tou wo process is function mein hoga aur item ka index delete ki tarha ye bhi humein edit k button se mil jayega.

  //state for add and edit button show condition by default hum isey false rekhen gy q k hum pehle add ka button hi show rakhna hai but jese hi user kisi item k edit button pr click kre tou is state ki help se hum JSX mein codition check krwa lengy. 
  const [editMode, setEditMode] = useState(false);

  //currentItem k name se ek state banayen gy taakey us mein current item ka index save ho jaye editItem k function mein phir us current index ki item ko updateItem k function mein step 5 mein list state mein save krwa len gy is se humari user ki selected value humare list state array mein bhi update ho jaye gea.
  const [currentItemIndex, setCurrentItemIndex] = useState();

  function editItem(index) {
    //PURPOSE: humein is function mein user jis bhi item k button pr click kre us index ki value input field mein show krwani hai aur add button ki jaga update ka button show hoga is condition k liye hum ek aur state bhi banayen gy "editMode" k name se.
    const itemValue = list[index];
    setInputValue(itemValue);
    setEditMode(true);
    //current item index save to state "currentItem" takey hum usey updateItem k function mein use kr sakey aur "list" state mein updated value ko same index pr set krwa dengy step 05 mein.
    setCurrentItemIndex(index)
  }


  //STEP 05
  //jo text input field k ander show huwa tha update honey k liye us 
  function updateItem() {
    //again copy state kren gy list ko q k humein ye state dobara update krwani hai with updated value

    const copyList = [...list];
    //currentItem ki state k ander user ne jo item select kia hai edit k liye us ka index number save hai aur hum "copList" ki state k ander usi index ki value ko bula kr updated value jo user ne input mein likhi thi edit ka button click krne k baad wo state mein save krwayi thi hum ne wo hum copyList k same index ki value k baraber kr den means us mein updated value store krwa den gy us specific index pr.
    copyList[currentItemIndex] = inputValue;

    //phir us k baad copyList jo updated state array usey dobara main "list" state mein set krdengy..
    setList(copyList);

    //aur input field ko dobara blank krden gy value jsey hi update ho aur update button ki jaga "add item" button dobara show ho jay neech 2 line mein hum yehi kaam kre gy.
    setInputValue("");
    setEditMode(false);
  }

  //jab bhi ye function execute ho ga jitne item list state k array mein ho gy ye us state ko wapis blank array mein set kr dega.
  function deleteAllItems() {
    setList([]);
  }


  return (
    <div className="App">
      <header className="App-header">



        {/* Start Todo Box */}
        <div className="todoBox">
          <div className='profile-sec'>
            <div className='col-8'><h1>TODO APP</h1></div>
            <div className='col-4'> <p>Welcome Back <strong>Danish Shaikh Qadri</strong></p>
            <img src={profilePic} alt="profile"/>
            </div>
          </div>
          <h3>Get's things done with TODO</h3>
          <p>Let's help you meet up your tasks</p>

         <div className='taskFieldsBox'>
          <div className='inputBox'>
            {/* input value k ander state mein jo update value ho show krwane k liye hum value attribute mein state ka name likhen gy.  */}
            <input onChange={updatedTxt} type="text" placeholder='Type Item Here' value={inputValue} />

            {/* yahan hum ternary operator se condition lagayen gy agar user edit k button pr click krega tou update k button show ho ga field k neeche else "add item" ka button hi show rahega. */}
            {editMode
              ? <button onClick={updateItem}>Update</button>
              : <button onClick={addItem}>Add Task</button>
            }
          </div>

          <div className='deleteAllBox'>
          {list.length ?  <button onClick={deleteAllItems}>Delete All</button> : ""}
          </div>
</div>

          <div class="listBox">
            {!list.length ? <p className='top-Space'>{"There are no tasks todo. Please add some tasks"}</p> :<h4 className='listHD'> {"Task List:"}</ h4>}
          <ul>
          {list.map(function (item, index) {
            // hum ne ek condition banayi hai k user jab ksi item ko edit kre aur edit mode true ho jaye to hum ne ek codition banayi hai k edit mode true ho aur currentItemIndex barabar ho jaye loop mein aane wale index k to us mein humari style ki ek class add ho jaye jis mein hum ne bg color change kia hai ap jab bhi koi li update honey lage ga tou us li ka color bhi change ho jaye ga is condition ki help editMode && currentItemIndex === index ? 'selected-item' : '' jo humne li mein lagayi hai.
            return <li className={editMode && currentItemIndex === index ? 'selected-item' : ''}>
             
              <div className='taskItem'>
             <div className='taskHD'> <h4>Task {index + 1}</h4></div>
              {/* yahan pr humein item ka current index argument mein bhejna hai aur hum directly is tarha nahi likh saktey hen onClick={deleteItem(index)} q k agar hum is tarha se likhen gy tou ye function render k sath hi run ho jaye ga q k ye JSX hai react ka is liye hum isey arrow function mein likhen gy  */}
              <div className='taskActions'>
              <button onClick={() => deleteItem(index)}>Delete</button>
              <button onClick={() => editItem(index)}>Edit</button>
              </div>
              </div>
              
              
              <div className='taskContent'>{item}</div>
              
            </li>
          })}
        </ul>
          </div>
          


        </div>
        {/* Close Todo Box */}


        

      </header>
    </div>
  );
}

export default App;
