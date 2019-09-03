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
        className={cn('checkbox-body',
          (wrong ? 'checkbox-body--wrong' : ''),
          (showAnswers && rightAnswer ? 'checkbox-body--success' : ''))}
        onClick={this.handleAnswer}
      >
        <div className="checkbox-body__checkbox-label">{translation}</div>
      </div>
    );
  }
}

export default TranslationComponent;
