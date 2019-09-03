import React from 'react';
import './ExerciseWordComponent.scss';

const PREFIX_TEXT = 'Word to translate:';

class ExerciseWordComponent extends React.PureComponent {
  render() {
    const { label } = this.props;
    return (

      <div className="WordContainer">
        <span className="WordContainer__title">
          {PREFIX_TEXT}
        </span>
        <span className="WordContainer__WordBody">{label}</span>
      </div>
    );
  }
}

export default ExerciseWordComponent;
