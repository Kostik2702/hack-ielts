import React, { PureComponent } from 'react';
import cn from 'classnames';

import Button from '../../../components/button';
import './ConstructorButton.scss';

class ConstructorButton extends PureComponent {
  render() {
    const { addLetter, wrongWordIdx, idx } = this.props;

    return (
      <Button
        className={cn('ConstructorButton',
          wrongWordIdx === idx ? 'ConstructorButton--wrong' : null)}
        handleClick={e => addLetter(
          { letter: e.target.textContent, idx },
        )}
        label={this.props.letter}
      />
    );
  }
}

export default ConstructorButton;
