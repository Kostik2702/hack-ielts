import React, { Component } from 'react';
import cn from 'classnames';

import './Button.scss';

export default class Button extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.handleClick} className={cn('Button', this.props.className)}>
        {this.props.label}
      </button>
    );
  }
}
