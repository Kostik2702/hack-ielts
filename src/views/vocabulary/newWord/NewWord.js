import React, { PureComponent } from 'react';
import cn from 'classnames';

import NewWordForm from './NewWordForm';
import './NewWord.scss';

class NewWordComponent extends PureComponent {
  render() {
    const { addNewWord } = this.props;
    return (
      <div className={cn('NewWord', this.props.className)}>
        <NewWordForm onSubmit={addNewWord} />
      </div>
    );
  }
}

export default NewWordComponent;
