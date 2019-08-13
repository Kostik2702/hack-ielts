import React, { PureComponent } from 'react';
import cn from 'classnames';

import VocabularyList from './list/VocabularyList';
import NewWord from './newWord/NewWord';

class VocabularyComponent extends PureComponent {
  render() {
    const {
      words, translation, actions, isModalOpen, handleCloseAddWordModal,
      handleOpenAddWordModal, customTranslate, loadingAudio,
    } = this.props;
    return (
      <div className={cn('Vocabulary', this.props.className)}>
        <NewWord
          updateState={actions.updateState}
          customTranslate={customTranslate}
          addNewWord={actions.addNewWord}
          openNewWordModal={actions.openNewWordModal}
          isModalOpen={isModalOpen}
          translation={translation}
          handleCloseAddWordModal={handleCloseAddWordModal}
          handleOpenAddWordModal={handleOpenAddWordModal}
        />
        <VocabularyList
          loadingAudio={loadingAudio}
          words={words}
          deleteWord={actions.deleteWord}
          playAudio={actions.playAudio}
        />

        <div style={{ display: 'none' }}>
          <audio id="audioPlayback" controls autoPlay>
            <track kind="captions" />
            <source id="audioSource" type="audio/mp3" src="" />
          </audio>
        </div>
      </div>
    );
  }
}

export default VocabularyComponent;
