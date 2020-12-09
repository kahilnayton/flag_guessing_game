import React from 'react'

const FlagChoices = (props) => {
  let options = props.options || []
  const { handleChange, handleSubmit } = props;
  // mapping over the 4 inputs - the value of checked is getting passed from the flag question component
  let inputs = options.map(opt => (
    <label key={opt.id}>
      <input
        type="radio"
        value={opt.id}
        checked={opt.checked}
        onChange={handleChange}
        name="flag-choice"
      />
    {opt.name}
    </label>
  ))
  return (
    <form className="flag-form" onSubmit={handleSubmit}>
      {inputs}
      <button type="submit">Guess</button>
    </form>
  )
}

export default FlagChoices
