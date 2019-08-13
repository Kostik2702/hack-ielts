import React, { PureComponent } from 'react';
import cn from 'classnames';

import './Input.scss';

export default class Input extends PureComponent {
  render() {
    return (
      <input
        className={cn('Input', this.props.className)}
        type="text"
        placeholder={this.props.placeholder}
        onKeyDown={this.props.onKeyDown}
        onChange={e => this.props.onChange(e.target.value)}
        value={this.props.value}
      />
    );
  }
}
