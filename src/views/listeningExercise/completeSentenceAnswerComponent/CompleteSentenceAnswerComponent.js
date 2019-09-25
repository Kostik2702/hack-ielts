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
    const answer = `${this.props.question} ${event.target.value}`;
    const callback = this.props.changeAction(answer, id);
    if (callback.payload.isAnswerCorrect) {
      this.setState({ correct: true, wrong: false });
    } else {
      this.setState({ correct: false, wrong: true });
    }
  };

  render() {
    const {
      question, changeAction, questionId,
    } = this.props;

    return (
      <div className="CompleteSentenceAnswer">
        <div className="CompleteSentenceAnswer__displayedText">
          <span className={cn('CompleteSentenceAnswer__displayedText__textBox',
            (this.state.wrong ? 'CompleteSentenceAnswer__displayedText__textBox--wrong' : ''),
            (this.state.correct ? 'CompleteSentenceAnswer__displayedText__textBox--correct' : ''))}
          >
            {question}
          </span>
          {' '}
          <input
            className={cn('CompleteSentenceAnswer__answer',
              (this.state.wrong ? 'CompleteSentenceAnswer__answer--wrong' : ''),
              (this.state.correct ? 'CompleteSentenceAnswer__answer--correct' : ''))}
            type="text"
            onChange={this.handleAnswer}
          />
        </div>

        <br />
      </div>
    );
  }
}

export default CompleteSentenceAnswerComponent;
