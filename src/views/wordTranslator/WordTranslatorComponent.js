import React, { PureComponent } from 'react';
import './WordTranslator.scss';
import TranslationComponent from './translationComponent/TranslationComponent';
import ExerciseWordComponent from './exerciseWordComponent/ExerciseWordComponent';
import SuccessMessageComponent from './successMessageComponent/SuccessMessageComponent';

class WordTranslatorComponent extends PureComponent {
  constructor() {
    super();
    this.state = { selectedRadio: null };
  }

    reset = () => {
      if (this.props.failure.word === '') this.setState({ selectedRadio: null });
    };

    handleAnswer = (translation) => {
      this.setState({ selectedRadio: translation });
    };

    render() {
      const {
        exerciseWord,
        translations,
        success,
        failure,
        showMessage,
        showExercise,
        runExercise,
        checkAnswer,
        showAnswers,
      } = this.props;

      if (!showAnswers) {
        this.reset();
      }

      return (
        <div className="word-translator">
          {showExercise
            ? (
              <ExerciseWordComponent label={exerciseWord.word} />
            ) : ''
                }
          <div className="word-translator__word-translations-container">
            <form className="word-translator__word-translations-container__form">
              {translations.map(item => (
                failure.word === item
                  ? (
                    <TranslationComponent
                      key={item}
                      translation={item}
                      wrong
                      selected={this.state.selectedRadio}
                      action={checkAnswer}
                      onChange={this.handleAnswer}
                    />
                  )
                  : (
                    <TranslationComponent
                      key={item}
                      translation={item}
                      wrong={false}
                      selected={this.state.selectedRadio}
                      action={checkAnswer}
                      onChange={this.handleAnswer}
                      showAnswers={showAnswers}
                    />
                  )
              ))}
            </form>
          </div>

          {showMessage
            ? (
              <SuccessMessageComponent runAgain={runExercise} success={success} />
            ) : ''}
        </div>
      );
    }
}

export default WordTranslatorComponent;
