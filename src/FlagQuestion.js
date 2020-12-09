import React, { Component } from 'react';
import FlagChoices from './FlagChoices';
import FlagAnswer from './FlagAnswer';


// Set up the options for all 3 states
const QuestionState = {
  QUESTION: 1,
  ANSWER_WRONG: 2,
  ANSWER_CORRECT: 3
}

class FlagQuestion extends Component {
  static defaultProps = {
    options: []
  }

  constructor(props) {
    super(props)
    this.state = {
      userChoice: undefined,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({userChoice: Number(e.target.value)})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onGuess(this.state.userChoice);
  }

  render() {
    const {
      flag,
      questionState,
      options,
      answerText,
      onNext
    } = this.props;
    const { userChoice } = this.state;
    let opts = options.map(opt => ({
      ...opt,
      checked: userChoice === opt.id ? true : false
    }))
    // if the state is in questions show the flag choices component otherwise show the answer component
    let output = questionState === QuestionStates.QUESTION ?
      (<FlagChoices
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        options={opts} />
      ) :
      (<FlagAnswer
        correct={questionState === QuestionStates.ANSWER_CORRECT}
        answer={answerText}
        onNext={onNext} />);
    return (
      <div>
        {output}
      </div>
    );
  }
}

export default FlagQuestion;