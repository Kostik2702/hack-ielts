import React from 'react';
import './TranslationComponent.scss';
import cn from 'classnames';

class TranslationComponent extends React.PureComponent {
  handleAnswer = (event) => {
    this.props.action(this.props.translation);
    this.props.onChange(this.props.translation);
  };

  render() {
    const {
      translation, wrong, selected, showAnswers,
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
      </div>
    );
  }
}

export default TranslationComponent;
