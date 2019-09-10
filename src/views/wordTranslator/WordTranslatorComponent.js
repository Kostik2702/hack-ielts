import React, { PureComponent } from 'react';
import './WordTranslator.scss';
import TranslationComponent from './translationComponent/TranslationComponent';
import ExerciseWordComponent from './exerciseWordComponent/ExerciseWordComponent';
import SuccessMessageComponent from './successMessageComponent/SuccessMessageComponent';


const NO_TRANSLATION = 0;

const keyCodes = [49, 50, 51, 52, 53];

class WordTranslatorComponent extends PureComponent {
  constructor() {
    super();
    this.state = { selectedRadio: null };
  }

  reset = () => {
    if (this.props.failure.word === '') {
      this.setState({
        selectedRadio: null,
      });
    }
  };

    handleAnswer = (translation) => {
      this.setState({ selectedRadio: translation });
    };

    render() {
      const translationNumber = NO_TRANSLATION;
      const { unit } = this.props.match.params;
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
        translationWay,
      } = this.props;

      if (!showAnswers) {
        this.reset();
      }

      return (
        <div className="WordTranslator">
          {showExercise
            ? (
              <ExerciseWordComponent
                label={translationWay
                  ? exerciseWord.translation
                  : exerciseWord.word}
              />
            ) : ''
                }
          <div className="WordTranslator__WordTranslationsContainer">
            <form className="WordTranslator__WordTranslationsContainer__form">
              {translations.map((item, index) => (
                failure.word === item
                  ? (
                    <TranslationComponent
                      key={item}
                      translation={item}
                      wrong
                      selected={this.state.selectedRadio}
                      action={checkAnswer}
                      onChange={this.handleAnswer}
                      translationNumber={index + 1}
                      keyCode={keyCodes[index]}
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
                      translationNumber={index + 1}
                      keyCode={keyCodes[index]}
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
