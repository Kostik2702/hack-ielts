import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VocabularyComponent from './VocabularyComponent';
import {
  fetchVocabulary,
  addNewWord,
  openNewWordModal,
  updateState,
  deleteWord,
  playAudio,
} from './vocabulary.duck';

import './Vocabulary.scss';
import './list/VocabularyList.scss';

const mapStateToProps = state => ({
  words: state.vocabulary.words,
  isModalOpen: state.vocabulary.isModalOpen,
  translation: state.vocabulary.translation,
  customTranslate: state.vocabulary.customTranslate,
  loadingAudio: state.vocabulary.loadingAudio,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchVocabulary,
        addNewWord,
        updateState,
        openNewWordModal,
        deleteWord,
        playAudio,
      }, dispatch,
    ),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class VocabularyContainer extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchVocabulary();
  }

  render() {
    return (
      <VocabularyComponent
        handleCloseAddWordModal={() => this.props.actions.updateState(
          { isModalOpen: false },
        )}
        handleOpenAddWordModal={() => this.props.actions.updateState(
          { isModalOpen: true },
        )}
        {...this.props}
      />
    );
  }
}

export default VocabularyContainer;
