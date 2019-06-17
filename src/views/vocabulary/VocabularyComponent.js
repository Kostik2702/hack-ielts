import React, { PureComponent } from 'react';
import cn from 'classnames';

class VocabularyComponent extends PureComponent {
  render() {
    return (
      <div className={cn('Vocabulary', this.props.className)}>
        Hello from vocabulary
      </div>
    );
  }
}

export default VocabularyComponent;
