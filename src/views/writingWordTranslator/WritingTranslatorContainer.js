import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './WritingTranslator.scss';
import WritingTranslatorComponent from './WritingTranslatorComponent';

import {
  getData,
  runEnglishToRussianTranslation,
  runRussianToEnglishTranslation,
  checkAnswer,
} from './writingWordTranslator.duck';

const mapStateToProps = state => ({
  exerciseWord: state.writingTranslator.exerciseWord,
  success: state.writingTranslator.success,
  rightAnswer: state.writingTranslator.rightAnswer,
  wrongAnswer: state.writingTranslator.wrongAnswer,
  translationWay: state.writingTranslator.translationWay,
  reset: state.writingTranslator.reset,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getData,
        runEnglishToRussianTranslation,
        runRussianToEnglishTranslation,
        checkAnswer,
      }, dispatch,
    ),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class WritingTranslatorContainer extends React.PureComponent {
  componentDidMount() {
    this.props.actions.getData();
  }

  render() {
    console.log(`t-way:${this.props.translationWay}`);
    return (
      <WritingTranslatorComponent
        checkAnswer={this.props.actions.checkAnswer}
        runEngRusExercise={this.props.actions.runEnglishToRussianTranslation}
        runRusEngExercise={this.props.actions.runRussianToEnglishTranslation}
        {...this.props}
      />
    );
  }
}

export default WritingTranslatorContainer;
