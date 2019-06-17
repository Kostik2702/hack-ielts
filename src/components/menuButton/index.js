import React, { PureComponent } from 'react';
import cn from 'classnames';

import './MenuButton.scss';

class MenuButton extends PureComponent {
  render() {
    return (
      <button type="button" onClick={this.props.onClick} className={cn('MenuButton', this.props.className)}>
        {this.props.label}
      </button>
    );
  }
}

export default MenuButton;
