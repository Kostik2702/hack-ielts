import React from 'react';
import './TranslatorButton.scss';

class TranslatorButton extends React.PureComponent {
  render() {
    const { label, action } = this.props;
    return (
      <button onClick={action} className="translator-button">{label}</button>
    );
  }
}

export default TranslatorButton;
