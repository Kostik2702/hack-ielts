import React, { PureComponent } from 'react';
import cn from 'classnames';

import VocabularyList from './list/VocabularyList';
import NewWord from './newWord/NewWord';

class VocabularyComponent extends PureComponent {
  render() {
    const { words, actions } = this.props;
    return (
      <div className={cn('Vocabulary', this.props.className)}>
        <NewWord addNewWord={actions.addNewWord} />
        <VocabularyList words={words} />
      </div>
    );
  }
}

export default VocabularyComponent;
