import React from 'react';
import './CompleteSentenceAnswerComponent.scss';
import cn from 'classnames';

class CompleteSentenceAnswerComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = { wrong: false, correct: false };
  }

  handleAnswer = (event) => {
    const id = this.props.questionId;
    const answer = `${this.props.questionLeftSide}${event.target.value}${this.props.questionRightSide}`;
    const callback = this.props.changeAction(answer, id);
    if (callback.payload.isAnswerCorrect) {
      this.setState({ correct: true, wrong: false });
    } else {
      this.setState({ correct: false, wrong: true });
    }
  };

  render() {
    const {
      questionLeftSide, questionRightSide, changeAction, questionId,
    } = this.props;

    return (
      <div className="CompleteSentenceAnswer">
        <div className="CompleteSentenceAnswer__displayedText">
          <div className={cn('CompleteSentenceAnswer__displayedText__textBox',
            (this.state.wrong ? 'CompleteSentenceAnswer__displayedText__textBox--wrong' : ''),
            (this.state.correct ? 'CompleteSentenceAnswer__displayedText__textBox--correct' : ''))}
          >
            {questionLeftSide}
          </div>
          <input
            className={cn('CompleteSentenceAnswer__answer',
              (this.state.wrong ? 'CompleteSentenceAnswer__answer--wrong' : ''),
              (this.state.correct ? 'CompleteSentenceAnswer__answer--correct' : ''))}
            type="text"
            onChange={this.handleAnswer}
          />
          <div className={cn('CompleteSentenceAnswer__displayedText__textBox',
            (this.state.wrong ? 'CompleteSentenceAnswer__displayedText__textBox--wrong' : ''),
            (this.state.correct ? 'CompleteSentenceAnswer__displayedText__textBox--correct' : ''))}
          >
            {questionRightSide}
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default CompleteSentenceAnswerComponent;
