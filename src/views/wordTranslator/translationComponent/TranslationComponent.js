import React from 'react';
import './TranslationComponent.scss';
import cn from 'classnames';

class TranslationComponent extends React.PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleAnswer = (event) => {
    this.props.action(this.props.translation);
    this.props.onChange(this.props.translation);
  };

  handleKeyDown = (event) => {
    const { keyCode, key } = event;
    if (keyCode === this.props.keyCode) {
      this.handleAnswer();
    }
  };

  render() {
    const {
      translation, wrong, selected, showAnswers, translationNumber,
    } = this.props;

    const rightAnswer = selected === translation;

    return (
      <div
        role="button"
        className={cn('CheckboxBody',
          (wrong ? 'CheckboxBody--wrong' : ''),
          (showAnswers && rightAnswer ? 'CheckboxBody--success' : ''))}
        onClick={this.handleAnswer}
      >
        <div className="CheckboxBody__CheckboxLabel">{translation}</div>
        <div className="CheckboxBody__CheckBoxNumber">{translationNumber}</div>
      </div>
    );
  }
}

export default TranslationComponent;
