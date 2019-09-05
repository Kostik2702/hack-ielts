import React from 'react';
import './SuccessMessageComponent.scss';
import { Link } from 'react-router-dom';
import TranslatorButton from '../../../components/translatorButton/translatorButton';

class SuccessMessageComponent extends React.PureComponent {
  render() {
    return (
      <div className="SuccessMessageComponent">
                Exercise finished!
        <br />
        <Link to="/master">
          <TranslatorButton label="To master" />
        </Link>
      </div>
    );
  }
}

export default SuccessMessageComponent;
