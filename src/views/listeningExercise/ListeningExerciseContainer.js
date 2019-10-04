import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initExercise, runExercise, checkCompleteSentenceAnswer } from './listeningExercise.duck';
import ListeningExerciseComponent
  from './ListeningExerciseComponent';

const mapStateToProps = state => ({
  exerciseStarted: state.listeningExercise.exerciseStarted,
  isAnswersAllowed: state.listeningExercise.isAnswersAllowed,
  recordingAudio: state.listeningExercise.recordingAudio,
  exerciseData: state.listeningExercise.exerciseData,
  completeSentenceFinished: state.listeningExercise.completeSentenceFinished,
  completeSentenceStarted: state.listeningExercise.completeSentenceStarted,
  colorAnswers: state.listeningExercise.colorAnswers,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        initExercise,
        runExercise,
        checkCompleteSentenceAnswer,
      }, dispatch,
    ),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class ListeningExerciseContainer extends React.PureComponent {
  componentDidMount() {
    this.props.actions.initExercise();
  }

  render() {
    return (
      <ListeningExerciseComponent
        init={this.props.actions.initExercise}
        run={this.props.actions.runExercise}
        checkAnswer={this.props.actions.checkCompleteSentenceAnswer}
        {...this.props}
      />
    );
  }
}


export default ListeningExerciseContainer;
