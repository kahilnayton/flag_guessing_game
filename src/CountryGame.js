import React, { Component } from 'react';
import FlagQuestion, { QuestionState } from './FlagQuestion';
import shiffle from 'shuffle-array'

class CountryGame extends Component {
  constructor(props) {
    // The super ensures that the prototypal inheritance comes from the extended react component
    super(props);

    this.state = {
      countries: [],
      options: [],
      correctOption: undefined,
      questionState: undefined,
    }
    this.onGuess = this.onGuess.bind(this);
    this.nextQuestion = this.nextQuetion.bind(this);
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(resp => resp.json())
      .then(countries => {
        // picking a random index from the array length
        const correctOption = Math.floor(Math.random() * countries.length);
        // then pass that index into get options - which returns the 4 options for the question
        const options = this._getOptions(correctOptions(correctOption, countries));
        this.setState({
          countries,
          correctOption,
          options,
          questionState: QuestionStates.QUESTION,
        })
      })
    .catch(console.warn)
  }

  onGuess(answer) {
    const { correctOption } = this.state;
    let questionState = answer === correctOption ?
      QuestionStates.ANSWER_CORRECT :
      QuestionStates.ANSWER_WRONG;
    this.setState({ questionState });
  }

  _getOptions(correctOption, countries) {
    let options = [correctOption];
    let tries = 0;
    while (options.length < 4 && tries < 15) {
      // we're only keeping track of the index of our options and the correct answer
      let option = Math.floor(Math.random() * countries.length);
      if (options.indexOf(option) === -1) {
        options.push(option);
      } else {
        tries++;
      }
    }
    return shuffle(options)
  }

  render() {
    let {
      countries,
      correctOption,
      options,
      questionState
    } = this.state;
    // will be displayed while counties is undefined
    let output = '<div>Loading...</div>'
    if (correctOption !== undefined) {
      // de structure the svg and the name of the correct option
      const { flag, name } = countries[correctOption];
      // this starts out as just ids - and we're converting it to an object with both ids and names
      let opts = options.map(opt => {
        return {
          id: opt,
          name: countries[opt].name
        }
      })
      output = (
        <FlagQuestion
          answerText={name}
          onGuess={this.onGuess}
          onNext={this.nextQuestion}
          options={opts}
          questionState={questionState}
          flag={flag}/>
      )
    }
    return (
      <div style={{ marginTop: '15px' }}>
        {output}
      </div>
    );
  }
}

export default CountryGame;