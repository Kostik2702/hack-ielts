import React, { PureComponent } from 'react';
import cn from 'classnames';

class VocabularyComponent extends PureComponent {
  render() {
    const { words } = this.props;
    return (
      <div className={cn('VocabularyList', this.props.className)}>
        <ul>
          { (words.map(w => (<li key={w.id}>{w.word}</li>))) }
        </ul>
      </div>
    );
  }
}

export default VocabularyComponent;
