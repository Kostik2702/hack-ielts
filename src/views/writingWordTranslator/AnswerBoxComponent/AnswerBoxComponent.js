import React from 'react';
import './AnswerBoxComponent.scss';
import cn from 'classnames';

class AnswerBoxComponent extends React.PureComponent {
  handleChange = (event) => {
    const inputText = event.target.value;
    this.props.action(inputText);
  };


  render() {
    const { wrong, right, inputText } = this.props;
    return (
      <div className="AnswerBox">
        <div className="AnswerBox__prefix">Translation:</div>
        <input
          value={inputText}
          onChange={this.handleChange}
          className={
          cn('AnswerBox__input',
            wrong ? 'AnswerBox__input--wrong' : '',
            right ? 'AnswerBox__input--right' : '')}
        />
      </div>
    );
  }
}

export default AnswerBoxComponent;
