import React, { Component } from "react";
import cn from 'classnames'

import './MenuButton.scss';

export default class MenuButton extends Component {
  render() {
    return (
      <button onClick={this.props.handleClick} className={cn('MenuButton', this.props.className)}>
        {this.props.label}
      </button>
    );
  }
}