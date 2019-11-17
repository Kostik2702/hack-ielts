import React from 'react';
import cn from 'classnames';
import AudioPlayerComponent from './audioPlayerComponent/AudioPlayerComponent';
import TranslatorButton from '../../components/translatorButton/translatorButton';
import CompleteSentenceExerciseComponent from './completeSentenceExercise/CompleteSentenceExerciseComponent';
import './ListeningExerciseComponent.scss';

class ListeningExerciseComponent extends React.PureComponent {
  render() {
    const {
      exerciseStarted,
      isAnswersAllowed,
      recordingAudio,
      exerciseData,
      completeSentenceFinished,
      completeSentenceStarted,
      run,
      colorAnswers,
      checkAnswer,
    } = this.props;

    return (
      <div className={cn(
        'ListeningExerciseComponent',
        (colorAnswers ? 'ListeningExerciseComponent--correct' : ''),
      )
      }
      >
        {exerciseStarted
          ? (
            <div className={cn('ListeningExerciseComponent__exercise')}>
              {recordingAudio
                ? <AudioPlayerComponent {...this.props} /> : ''
                  }
              {completeSentenceStarted && !completeSentenceFinished
                ? (
                  <CompleteSentenceExerciseComponent
                    checkAnswer={checkAnswer}
                    questions={exerciseData.completeSentenceQuestions}
                    colorAnswers={colorAnswers}
                    isAnswersAllowed={isAnswersAllowed}
                  />
                ) : '' }
            </div>
          )
          : (
            <div className="ListeningExerciseComponent__startButtonBox">
              <TranslatorButton action={run} label="Run exercise" />
            </div>
          )
          }
      </div>
    );
  }
}

export default ListeningExerciseComponent;
