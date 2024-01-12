//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import anime from './giphy.gif';
import fail from './fail.gif';
import pass01 from './pass01.gif';
import loadingCircle from './loading.gif';
/*
Note: Hum is quizz app banaey k liye useEffect use kren gy.
useEffect k 3 methods hen.
Kab chalta hai: jab component start ho aur ek bar render ho jaye us k baad.
purpose: API call karni ho ya Initial logic lagani ho.
(ye hum is liye bhi use krtey hen jo mujhy smjh aya jab bhi hum state use krtey hen apni app mein to wo dobara rendring chalata hai mtlb apka code dobar run hota hai user k screen pr jab bhi user koi click kre ya koi jis update ho us click pr state mein code dobara render hoga agr is tarha agar hum ne koi API apni app mein call ki ho gea to wo bhi baar baar call ho rhi ho gea jb bhi state mein koi change aaye ga ya koi popup humein show krwana hai apni web pr sirf ek br lekin jb bhi state update ho gea tou wo bhi baar baar show hoga is liye hum useEffect use k initial methoda ko use krtey hen taak jo code humein sirf ek baar chalana ho ya API wo sirf ek baar hi call ho baki bhale se state udpate hoti rahe)
1: Initial

useEffect(function(){

} , [])

[] => ye dependency list hoti hai is se useEffect ko pata chalta hai k sirf ye ek baar chale

2: updation
3: unmount
*/

function App() {
/*
  const [questions, setQuestions] = useState([{ "category": "geography", "id": "6237428ccb85f7ce9e949dd8", "correctAnswer": "Dushanbe", "incorrectAnswers": ["Moscow", "Vilnius", "Antananarivo"], "question": { "text": "What is the capital city of Tajikistan?" }, "tags": ["geography"], "type": "text_choice", "difficulty": "hard", "regions": [], "isNiche": false }, { "category": "arts_and_literature", "id": "622a1c367cc59eab6f950192", "correctAnswer": "Rembrandt", "incorrectAnswers": ["Vermeer", "Van Gogh", "Monet"], "question": { "text": "What Dutch master painted 64 self-portraits?" }, "tags": ["painting", "art", "the_netherlands", "arts_and_literature"], "type": "text_choice", "difficulty": "hard", "regions": [], "isNiche": false }, { "category": "sport_and_leisure", "id": "622a1c357cc59eab6f950020", "correctAnswer": "Tennis", "incorrectAnswers": ["Soccer", "Badminton", "Volleyball"], "question": { "text": "Within Which Sport Might You Encounter The Cyclops System?" }, "tags": ["technology", "sport"], "type": "text_choice", "difficulty": "medium", "regions": [], "isNiche": false }, { "category": "society_and_culture", "id": "622a1c3d7cc59eab6f951b98", "correctAnswer": "Christian Dior", "incorrectAnswers": ["Coco Chanel", "Yves Saint Laurent", "Pierre Cardin"], "question": { "text": "In 1950 which French designer created the so-called 'New Look'?" }, "tags": ["people", "fashion", "society_and_culture"], "type": "text_choice", "difficulty": "hard", "regions": [], "isNiche": false }, { "category": "music", "id": "625064a0e12f6dec240bdfc1", "correctAnswer": "What I Am", "incorrectAnswers": ["Turning Japanese", "Rebirth of Slick (Cool Like Dat)", "Electric Avenue"], "question": { "text": "Edie Brickell & New Bohemians had a one hit wonder in 1986 with which song?" }, "tags": ["songs", "one_hit_wonders", "music"], "type": "text_choice", "difficulty": "hard", "regions": [], "isNiche": false }, { "category": "arts_and_literature", "id": "622a1c397cc59eab6f950eee", "correctAnswer": "Joseph Conrad", "incorrectAnswers": ["Charles Dickens", "Henryk Sienkiewicz", "Oscar Wilde"], "question": { "text": "Which author wrote 'Heart of Darkness'?" }, "tags": ["classic_novels", "literature", "arts_and_literature"], "type": "text_choice", "difficulty": "hard", "regions": [], "isNiche": false }, { "category": "science", "id": "622a1c3e7cc59eab6f952274", "correctAnswer": "Twice the speed of sound", "incorrectAnswers": ["Twice the speed of light", "200 miles per hour", "2 miles per second"], "question": { "text": "If you were travelling at mach 2 how fast would you be travelling?" }, "tags": ["science", "words"], "type": "text_choice", "difficulty": "medium", "regions": [], "isNiche": false }, { "category": "film_and_tv", "id": "625740a49da29df7b05f73ed", "correctAnswer": "Chinatown", "incorrectAnswers": ["Gran Torino", "Up", "Gone Girl"], "question": { "text": "Name the movie that matches the following plot summary: 'A detective hired to expose an adulterer finds himself caught up in a web of deceit.'" }, "tags": ["film", "film_and_tv"], "type": "text_choice", "difficulty": "medium", "regions": [], "isNiche": false }, { "category": "music", "id": "622a1c397cc59eab6f950d1f", "correctAnswer": "The Beatles", "incorrectAnswers": ["Deep Purple", "Feeder", "Uriah Heep"], "question": { "text": "Which English rock band released the studio album 'Yellow Submarine'?" }, "tags": ["rock_music", "general_knowledge", "music"], "type": "text_choice", "difficulty": "easy", "regions": [], "isNiche": false }, { "category": "history", "id": "622a1c3c7cc59eab6f9517fa", "correctAnswer": "Pompeii", "incorrectAnswers": ["Genoa", "Capua", "Ostia"], "question": { "text": "Which Roman city was buried under volcanic ash from Mount Vesuvius In 79A.D.?" }, "tags": ["romans", "volcanoes", "italy", "classics", "history"], "type": "text_choice", "difficulty": "easy", "regions": [], "isNiche": false }]);
  */
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [selectedAnswerClass, setSelectedAnswerClass] = useState('');
  const [finishQuizz, setFinishQuizz]= useState(false);
  const [blankFields, setBlankFields]= useState();
  const [loadingImg, setLoadingImg]= useState(false);
  const [suffleMode, setSuffleMode] = useState(true);

  // Use a state to keep track of shuffled answers for each question
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  
  useEffect(() => {
    quizzApiData();
  }, []);
  
  useEffect(() => {
    // When questions change, shuffle the answers for the current question
    if (questions.length > 0) {
      setShuffledAnswers(shuffleArray());
    }
  }, [questions, currentIndex]);
  
  const quizzApiData = () => {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => setQuestions(res))
      .catch(error => console.error('Error fetching data:', error));
  };
  
  const shuffleArray = () => {
    // Fetching questions inside shuffleArray is unnecessary
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) {
      return [];
    }
  
    const combineAnswers = [
      currentQuestion.correctAnswer,
      ...currentQuestion.incorrectAnswers,
    ];
  
    // Shuffle the answers directly
    return combineAnswers.sort(() => Math.random() - 0.5);
  };
  
  

  const combineAnswers = shuffledAnswers;



  function restartQuizz() {
    setBlankFields(false);
    setCurrentIndex(0);
    setTotalScore(0);
    setUserAnswer(null);
    setWrongAnswer(false);
    setSelectedAnswerClass('');
  }

  function answerSelect(event) {
    const selectedAnswer = event.target.value;
    setUserAnswer(selectedAnswer);
  }
  

  function nextQuestion() {
    if(userAnswer === null){
      setBlankFields(true);
    }else{
      // setSuffleMode(true);
      setLoadingImg(true);
      setBlankFields(false);
    const isCorrect = userAnswer === questions[currentIndex].correctAnswer;
    setWrongAnswer(!isCorrect);

    // Highlight the selected answer
    setSelectedAnswerClass(isCorrect ? 'correctAnswer' : 'wrongAnswer');

    setTimeout(() => {
      // Clear the interval to avoid unwanted behavior
      setCurrentIndex(currentIndex + 1);
      setUserAnswer(null);

      // Remove the highlight from the selected answer
      setSelectedAnswerClass('');

      // Update the total score based on the user's answer
      if (isCorrect) {
        setTotalScore(totalScore + 10);
      }
      setWrongAnswer(false);

// Clear the radio button selection
const radioButtons = document.getElementsByName('answer');
radioButtons.forEach((radio) => {
  console.log(radio);
  radio.checked = false;
  setLoadingImg(false);
});
    }, 2000);

  }
  }

function checkResult() {
  if(userAnswer === null){
    setBlankFields(true);
  }else{
    setLoadingImg(true);
  const isCorrect = userAnswer === questions[currentIndex].correctAnswer;
  setWrongAnswer(!isCorrect);

  // Highlight the selected answer
  setSelectedAnswerClass(isCorrect ? 'correctAnswer' : 'wrongAnswer');

  setTimeout(() => {
    // Clear the interval to avoid unwanted behavior
    setUserAnswer(null);

    // Remove the highlight from the selected answer
    setSelectedAnswerClass('');

    // Update the total score based on the user's answer
    if (isCorrect) {
      setTotalScore(totalScore + 10);
    }
    setWrongAnswer(false);
    setFinishQuizz(true);
    setBlankFields(false);

  }, 2000);

  setLoadingImg(false);
}
}  


  console.log(questions);
  console.log(combineAnswers);

  // const totalTime= 30;
  // console.log(totalTime);
  // setTimeout(() => {
  //   totalTime - 1;
  //   console.log(totalTime);
  // }, 1000);

  return (
    <div className="App">
      {/* {totalTime} */}
      <header className="App-header">
        {!questions.length
          ? <h2>{finishQuizz ? "" : "Loading ..."}</h2>
          : <div className="quizBOx">
           { finishQuizz   
       ? <div className='resultPage'>
          <div>
            {totalScore > 40 
            ? <div>
              <img src={pass01} height={200}/>
              <h3>Congratulation you are pass</h3>
              </div> 
              : <div>
                <img src={fail} height={200}/><h3>You are fail..! Better luck next time </h3>
                </div> 
                }
          </div>
          <h2>Your total score  is {totalScore}</h2>
        </div>

 : <div className='answerList'>
           <div className='totalMarks'>Total Marks: {totalScore}</div>
            <div className='fieldsSec'>
            {loadingImg && <img src={loadingCircle} className='loadingImg'/>}
              <div className='topInfo'>
                <h2>Welcome To The Quiz</h2>
                <h4><strong>Total Question:</strong> 10</h4>
                <h4><strong>Question Marks:</strong> 10</h4>
                <h4><strong>Passing Marks:</strong> Above 40</h4>
              </div>
            <div className='questionBox'><h2>Q{currentIndex + 1}) {questions[currentIndex].question.text}</h2></div> 
           <div className='error'>{blankFields ? "Please select any answer to proceed to next question" : ""}</div>
              {
              combineAnswers.map(function (answer, index) {
                return <div >
                  <label htmlFor={`answer${index}`} 
                  className={
                    userAnswer === answer
                      ? selectedAnswerClass
                      : ""
                  }
                  >
                    <input
                      id={`answer${index}`}
                      name="answer"
                      type="radio"
                      onChange={answerSelect}
                      value={answer}
                    />
                    {answer}
                  </label>
                </div>
              })
            }
            
            <div className='actionFooter'>
        {currentIndex === questions.length - 1  
          ? <div>
            <button onClick={restartQuizz}>Restart</button>
           <button onClick={checkResult}>Check Result</button> 
            </div>
          : finishQuizz === false ? <button onClick={nextQuestion}>Next Question</button> : ""
        }
      </div>

            </div>
            <div class="quiz-anime"><img src={anime}/></div>
</div>
 
 }
          </div>
        }

       
    
      </header>
    </div>
  );
}

export default App;
