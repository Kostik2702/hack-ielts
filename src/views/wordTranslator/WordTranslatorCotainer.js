import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WordTranslatorComponent from './WordTranslatorComponent';
import {
  getTranslationsData,
  runExercise,
  updateState,
  checkResult,
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
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getTranslationsData,
        runExercise,
        updateState,
        checkResult,
      }, dispatch,
    ),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class WordTranslatorContainer extends PureComponent {
  componentDidMount() {
    this.props.actions.getTranslationsData();
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
