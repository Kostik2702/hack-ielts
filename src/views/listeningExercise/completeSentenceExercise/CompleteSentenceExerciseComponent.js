import React from 'react';
import cn from 'classnames';
import CompleteSentenceAnswerComponent from '../completeSentenceAnswerComponent/CompleteSentenceAnswerComponent';
import './CompleteSentenceExerciseComponent.scss';

class CompleteSentenceExerciseComponent extends React.PureComponent {
    checkAnswerAction = (answer, questionId) => {
      const callback = this.props.checkAnswer({ actualAnswer: answer, actualId: questionId });

      return callback;
    };


    render() {
      const {
        questions,
        completeSentenceFinished,
        colorAnswers,
      } = this.props;

      const sentencesToComplete = questions
        .map(question => (
          <CompleteSentenceAnswerComponent
            key={question.id}
            questionLeftSide={question.displayedTextLeftSide}
            questionRightSide={question.displayedTextRightSide}
            changeAction={this.checkAnswerAction}
            questionId={question.id}
          />
        ));


      return (
        <div className="CompleteSentenceExerciseComponent">
          <h2 className={cn(
            'CompleteSentenceExerciseComponent__title',
            (colorAnswers ? 'CompleteSentenceExerciseComponent__title--correct' : ''),
          )}
          >
            {colorAnswers ? 'Sentences completed ' : 'Complete this sentences'}
          </h2>
          <br />
          {sentencesToComplete}
        </div>
      );
    }
}

export default CompleteSentenceExerciseComponent;
