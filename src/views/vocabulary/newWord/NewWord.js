import React, { PureComponent } from 'react';
import cn from 'classnames';

import NewWordForm from './NewWordForm';
import Modal from '../../../components/modal/Modal';
import Input from '../../../components/input/Input';
import Button from '../../../components/button';
import './NewWord.scss';

class NewWordComponent extends PureComponent {
  handleKeyDown = (e) => {
    const { addNewWord, customTranslate } = this.props;
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewWord({ translation: customTranslate, isCustom: true });
    }
  };

  render() {
    const {
      openNewWordModal, isModalOpen, handleCloseAddWordModal, translation,
      addNewWord, updateState, customTranslate,
    } = this.props;

    return (
      <div className={cn('NewWord', this.props.className)}>
        <NewWordForm onSubmit={openNewWordModal} />
        <Modal
          parentSelector={() => document.querySelector('.NewWord')}
          isOpen={isModalOpen}
          onRequestClose={handleCloseAddWordModal}
          shouldCloseOnOverlayClick
        >
          <div
            className="NewWord__translate"
            role="button"
            onClick={() => addNewWord({ translation, isCustom: false })}
          >
            { translation }
          </div>

          <div className="NewWord__customTranslate">
            <Input
              value={customTranslate}
              onKeyDown={this.handleKeyDown}
              onChange={t => updateState({ customTranslate: t })}
              placeholder="Your translation"
            />
            <Button
              handleClick={() => addNewWord(
                { translation: customTranslate, isCustom: true },
              )}
              label="Save"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default NewWordComponent;
