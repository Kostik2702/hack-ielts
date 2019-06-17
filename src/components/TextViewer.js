import React, { PureComponent } from 'react';
import cn from 'classnames';

export default class TextViewer extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <div className={cn('', this.props.className)}>
        {text}
      </div>
    );
  }
}
