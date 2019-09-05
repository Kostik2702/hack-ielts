import React from 'react';
import './WritingTranslator.scss';
import WordBoxComponent from './WordBoxComponent/WordBoxComponent';
import AnswerBoxComponent from './AnswerBoxComponent/AnswerBoxComponent';
import ButtonBoxComponent from './ButtonBoxComponent/ButtonBoxComponent';
import SuccessMessageComponent from './SuccessMessageComponent/SuccessMessageComponent';

class WritingTranslatorComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = { inputText: '' };
  }

  handleTextChange = (text) => {
    this.setState({ inputText: text });
  };

  handleSubmitAnswer = () => {
    console.log(this.state.inputText);
    this.props.checkAnswer(this.state.inputText);
  };

  reset = () => {
    this.setState({ inputText: '' });
  };

  render() {
    const {
      exerciseWord,
      success,
      rightAnswer,
      wrongAnswer,
      checkAnswer,
      runRusEngExercise,
      runEngRusExercise,
      translationWay,
      reset,
    } = this.props;
    if (reset) {
      this.reset();
    }
    return (
      <div className="WritingTranslatorContainer">
        {exerciseWord.word
          ? (
            <div>
              <WordBoxComponent translationWay={translationWay} exerciseWord={exerciseWord} />
              <AnswerBoxComponent
                inputText={this.state.inputText}
                wrong={wrongAnswer}
                right={rightAnswer}
                action={this.handleTextChange}
              />
              <ButtonBoxComponent persist={this.handleSubmitAnswer} />
            </div>
          )
          : (
            <div>
              {success ? <SuccessMessageComponent /> : ''}
              <ButtonBoxComponent runRusEng={runRusEngExercise} runEngRus={runEngRusExercise} />
            </div>
          )}

      </div>
    );
  }
}

export default WritingTranslatorComponent;
