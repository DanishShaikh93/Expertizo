import './App.css';
import {useEffect, useState } from 'react';
import Questions from './views/Questions';
import Result from './views/Result';

function App() {

  useEffect(function () {
    getQuestions();
  }, [])

const [questions, setQuestions]=useState([]);
const [currentIndex, setCurrentIndex]=useState(0);
const[score, setScore]=useState(0);
const[userAnswer, setUserAnswer]=useState(null);
const[emptyField, setEmptyField]= useState();

function getQuestions() {
  fetch('https://the-trivia-api.com/v2/questions')
  .then((res) => res.json())
  .then((res) => {

res.map(function (item) {
  item.options=[...item.incorrectAnswers, item.correctAnswer]
  item.options= shuffle(item.options);
});

setQuestions(res);
console.log(res);
  });

}

//suffle function start
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


if(!questions.length){
  return <h2>Loading...</h2>
}


// let minutes = 10;
// let seconds = 10;

// const intervalId = setInterval(() => {
//   // Ensure minutes and seconds are always displayed with two digits
//   const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
//   const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

//   console.log(`${formattedMinutes}:${formattedSeconds}`);

//   seconds -= 1;

//   if (seconds < 0) {
//     // Reset seconds to 10
//     seconds = 10;

//     // Decrement minutes
//     minutes -= 1;

//     // Check if the countdown is complete
//     if (minutes < 0) {
//       clearInterval(intervalId);
//       console.log('Countdown complete!');
//     }
//   }
// }, 1000);



function next() {

if(userAnswer != null){  
  if(userAnswer=== questions[currentIndex].correctAnswer){
    setScore( score + 10);
  }
  setCurrentIndex(currentIndex + 1);
  setUserAnswer(null)
  setEmptyField(false);
  const radioButtons = document.getElementsByName('answers');
  radioButtons.forEach((radio) => {
    radio.checked = false;
  });
 
}else{
  setEmptyField(true);
}

}


function answer(event){
const selectedAnswer= event.target.value;
setUserAnswer(selectedAnswer);
console.log(selectedAnswer);
}


const quizEnd= currentIndex === questions.length;

//suffle function close

  return (
    <div className="App">
      <header className="App-header">
       {!quizEnd ?

        <Questions questions={questions} currentIndex={currentIndex} answerFunc={answer} nextFunc={next} score={score} emptyField={emptyField}/>

      :
      
      <Result score={score}/>
     
    } 
    



      </header>
    </div>
  );
}

export default App;
