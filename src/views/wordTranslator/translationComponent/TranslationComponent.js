import React from 'react';
import './TranslationComponent.scss';

class TranslationComponent extends React.PureComponent {
  handleAnswer = (event) => {
    this.props.action(event.target.value);
    this.props.onChange(event);
  };

  render() {
    const {
      translation, wrong, selected,
    } = this.props;
    return (
      wrong
        ? (
          <div className="checkbox-body wrong">
            <div className="checkbox-label">{translation}</div>
            <input
              type="radio"
              name="translation"
              className="word-checkbox"
              value={translation}
              checked={selected === translation}
              onChange={this.handleAnswer}
            />
          </div>
        )

        : (
          <div className="checkbox-body">
            <div className="checkbox-label">{translation}</div>
            <input
              type="radio"
              name="translation"
              className="word-checkbox"
              value={translation}
              checked={selected === translation}
              onChange={this.handleAnswer}
            />
          </div>
        ));
  }
}

export default TranslationComponent;
