import React from 'react';
import './ExerciseWordComponent.scss';

const PREFIX_TEXT = 'Word to translate:';

class ExerciseWordComponent extends React.PureComponent {
  render() {
    const { label } = this.props;
    return (

      <div className="word-container">
        <span className="word-container__word-title">
          {PREFIX_TEXT}
        </span>
        <span className="word-container__word-body">{label}</span>
      </div>
    );
  }
}

export default ExerciseWordComponent;
