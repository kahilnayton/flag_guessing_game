import React from 'react'


const FlagAnswer = ({ correct, answer, onNext }) => {
  // onNext is coming all the way from out country game component
  // basic correct or incorrect based on the props we pass in
  return (
    <div className='flag-answer'>
      {correct ?
        `Correct!: ${answer}` :
        `Incorrect! Correct Answer: ${answer}`}
      <button onClick={onNext}>Next</button>
    </div>
  )
}

export default FlagAnswer
