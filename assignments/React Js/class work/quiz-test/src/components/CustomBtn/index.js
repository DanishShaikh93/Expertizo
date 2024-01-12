function CustomBtn(props) {
const contact = ()=>{
  alert("Contact Button Clicked");  
}
    
    return <button onClick={contact} className="contactBTn">{props.buttonName}</button>
}

export default CustomBtn;