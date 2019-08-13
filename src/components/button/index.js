import React, { PureComponent } from 'react';
import cn from 'classnames';

import './Button.scss';

export default class Button extends PureComponent {
  render() {
    return (
      <button
        type={this.props.type || 'button'}
        onClick={this.props.handleClick}
        className={cn('Button', this.props.className)}
      >
        { this.props.label }
      </button>
    );
  }
}
