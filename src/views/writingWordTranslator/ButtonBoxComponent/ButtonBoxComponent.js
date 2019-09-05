import React from 'react';
import './ButtonBoxComponent.scss';
import TranslatorButton from '../../../components/translatorButton/translatorButton';

class ButtonBoxComponent extends React.PureComponent {
  render() {
    const { runRusEng, runEngRus, persist } = this.props;
    return (
      <div className="ButtonBox">
        {persist ? <TranslatorButton action={persist} label="Submit answer" /> : (
          <div>
            <div>
              <TranslatorButton action={runEngRus} label="Translation to Russian" />
            </div>
            <div><TranslatorButton action={runRusEng} label="Translation to English" /></div>
          </div>
        )}
      </div>
    );
  }
}

export default ButtonBoxComponent;
