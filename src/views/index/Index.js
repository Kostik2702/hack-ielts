import React, { PureComponent } from 'react';
import cn from 'classnames';

import './Index.scss';

class Index extends PureComponent {
  render() {
    return (
      <div className={cn('Index', this.props.className)}>
        index page
      </div>
    );
  }
}

export default Index;
