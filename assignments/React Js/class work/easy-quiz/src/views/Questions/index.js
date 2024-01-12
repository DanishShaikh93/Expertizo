import { useState } from "react";

function Questions(props) {
    const {questions, currentIndex, answerFunc, nextFunc, score, emptyField}= props;

    return (
    <div className='questionBox'>
      <h2>Q{currentIndex + 1}) {questions[currentIndex].question.text}</h2>
      {emptyField ? "Please select any answer to proceed to next question" : ""}
      {questions[currentIndex].options.map(function (item) {
        return <div>
          <label htmlFor=''>
        <input type="radio" name="answers" value={item} onChange={answerFunc}/> {item}
        </label>
        </div>
      })}
      <button onClick={nextFunc}>Next</button>
      <p>Total Score {score}</p>
      </div>
);
}

export default Questions