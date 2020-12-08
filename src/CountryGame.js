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
    let output = ''
    return (
      <div>
        
      </div>
    );
  }
}

export default CountryGame;