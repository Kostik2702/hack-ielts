import React from 'react';
import './WordBoxComponent.scss';

const ENG_RUS_WAY = true;

class WordBoxComponent extends React.PureComponent {
  render() {
    const { exerciseWord, translationWay } = this.props;

    return (
      <div className="WordBox">
        <div className="WordBox__prefix">Word:</div>
        <div className="WordBox__word">
          {
            translationWay === ENG_RUS_WAY ? exerciseWord.word : exerciseWord.translation
        }
        </div>
      </div>
    );
  }
}

export default WordBoxComponent;
