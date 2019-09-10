import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WordTranslatorComponent from './WordTranslatorComponent';
import {
  getTranslationsData,
  runExercise,
  updateState,
  checkResult,
  finishExercise,
} from './wordTranslator.duck';

const mapStateToProps = state => ({
  words: state.translator.words,
  translations: state.translator.translations,
  exerciseWord: state.translator.exerciseWord,
  translatedWords: state.translator.translatedWords,
  success: state.translator.success,
  failure: state.translator.failure,
  iteration: state.translator.iteration,
  showMessage: state.translator.showMessage,
  showExercise: state.translator.showExercise,
  showAnswers: state.translator.showAnswers,
  translationWay: state.translator.translationWay,
});

const TO_RUSSIAN_SUFFIX = 'russian';
const TO_ENGLISH_SUFFIX = 'english';

const ENGLISH_TO_RUSSIAN = true;
const RUSSIAN_TO_ENGLISH = false;

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getTranslationsData,
        runExercise,
        updateState,
        checkResult,
        finishExercise,
      }, dispatch,
    ),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class WordTranslatorContainer extends PureComponent {
  componentDidMount() {
    const { unit } = this.props.match.params;
    this.props.actions.getTranslationsData(unit);
  }

  render() {
    return (
      <WordTranslatorComponent
        checkAnswer={this.props.actions.checkResult}
        runExercise={this.props.actions.runExercise}
        {...this.props}
      />
    );
  }
}

export default WordTranslatorContainer;
