import React from 'react';
import './SuccessMessageComponent.scss';
import { Link } from 'react-router-dom';
import TranslatorButton from '../../../components/translatorButton/translatorButton';

class SuccessMessageComponent extends React.PureComponent {
  render() {
    const { runAgain, success } = this.props;

    return (
      <div className="alert-block">
        {success ? <span className="correct">You finished this exercise!</span> : ''}
        <br />
        <Link to="/master">
          <TranslatorButton label="To master" />
        </Link>

        <TranslatorButton action={runAgain} label="Run again" />

      </div>
    );
  }
}

export default SuccessMessageComponent;
