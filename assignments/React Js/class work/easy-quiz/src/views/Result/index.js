import { useState } from "react";

function Result(props) {
    const {score}= props;
    return ( 
    <div className='resultBox'>Result Total Score {score}</div>
    )
}

export default Result