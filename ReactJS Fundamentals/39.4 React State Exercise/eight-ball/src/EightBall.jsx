import React, { useState } from "react";
import './EightBall.css';

const EightBall = ({answers}) => {
  const reset = () => {
    setAnswer({
      msg: "Think of a Question",
      color: "black",
    })
    setGreenCount(0)
    setRedCount(0)
    setYellowCount(0)
  }
  
  const [answer, setAnswer] = useState({
    msg: "Think of a Question",
    color: "black",
  });

  const [greenCount, setGreenCount] = useState(0)
  const [redCount, setRedCount] = useState(0)
  const [yellowCount, setYellowCount] = useState(0)

  function handleClick(evt) {
    const randIdx = Math.floor(Math.random() * answers.length);
    let ans = answers[randIdx];
    let clr = ans.color;

    setAnswer(ans);
    
    if (clr === "green") {
      setGreenCount(greenCount + 1) 
    } 
    if (clr === 'red') {
      setRedCount(redCount + 1);
    } 
    if (clr === 'goldenrod') {
      setYellowCount(yellowCount + 1)
    }
  }

  return (
    <div>
      <div>
        <span>Number of green: {greenCount}</span>
        <span>Number of red: {redCount}</span>
        <span>Number of yellow: {yellowCount}</span>
      </div>
      <div className="EightBall" onClick={handleClick} style={{ backgroundColor: answer.color}}>
      <b>{answer.msg}</b>
      </div>
      <button onClick={reset}>Reset</button>
    </div>

  );
};

EightBall.defaultProps = {
  answers: [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ]
}

export default EightBall