import React, { PureComponent } from 'react';
import './WordTranslator.scss';
import { Link } from 'react-router-dom';
import TranslatorButton from '../../components/translatorButton/translatorButton';


class WordTranslatorComponent extends PureComponent {
  constructor() {
    super();
    this.state = { selectedRadio: null };
  }

    reset = () => {
      if (this.props.failure.word === '') this.setState({ selectedRadio: null });
    };

    handleAnswer = (event) => {
      this.setState({ selectedRadio: event.target.value });
      this.props.checkAnswer(event.target.value);
    };

    render() {
      this.reset();
      const {
        exerciseWord,
        translations,
        success,
        failure,
        showMessage,
        showExercise,
        runExercise,
      } = this.props;

      return (
        <div className="word-translator">
          {showExercise
            ? (
              <div className="word-container">
                <span className="word-title">
            Word to translate:
                </span>
                <span className="word-body">{exerciseWord.word}</span>
              </div>
            ) : ''
                }
          <div className="word-translations-container">
            <form>
              {translations.map(item => (
                failure.word === item
                  ? (
                    <div className="checkbox-body wrong" key={item}>
                      <div className="checkbox-label">{item}</div>
                      <input
                        type="radio"
                        name="translation"
                        className="word-checkbox"
                        value={item}
                        checked={this.state.selectedRadio === item}
                        onChange={this.handleAnswer}
                      />
                    </div>
                  )
                  : (
                    <div className="checkbox-body" key={item}>
                      <div className="checkbox-label">{item}</div>
                      <input
                        type="radio"
                        name="translation"
                        className="word-checkbox"
                        value={item}
                        checked={this.state.selectedRadio === item}
                        onChange={this.handleAnswer}
                      />
                    </div>
                  )
              ))}
            </form>
          </div>

          {showMessage
            ? (
              <div className="alert-block">
                {success ? <span className="correct">You finished this exercise!</span> : ''}
                <br />
                <Link to="/master">
                  <TranslatorButton label="To master" />
                </Link>

                <TranslatorButton action={runExercise} label="Run again" />

              </div>
            ) : ''}
        </div>
      );
    }
}

export default WordTranslatorComponent;
