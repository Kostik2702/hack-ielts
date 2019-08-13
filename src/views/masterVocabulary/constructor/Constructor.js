import React, { PureComponent } from 'react';
import cn from 'classnames';

import './Constructor.scss';
import ConstructorButton from './ConstructorButton';
import ConstructorCell from './ConstructorCell';

class Constructor extends PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const { keyCode, key } = event;
    if (keyCode >= 65 && keyCode <= 90) {
      this.props.addLetter({ letter: key });
    }
  };

  render() {
    const {
      words, translation, answer, addLetter, mistakes,
    } = this.props;
    return (
      <div className={cn('Constructor', this.props.className)}>
        <div className="Constructor__translation">{ translation }</div>

        <div className="Constructor__input">
          { answer.map(
            (w, i) => <ConstructorCell key={`${i}$_{w}`} value={w} />,
          ) }
        </div>

        <div className="Constructor__letters">
          { words.map((w, i) => (
            <ConstructorButton
              key={`${i}_${w}`}
              wrongWordIdx={mistakes.wIdx}
              addLetter={addLetter}
              idx={i}
              letter={w}
            />
          )) }
        </div>
      </div>
    );
  }
}

export default Constructor;
