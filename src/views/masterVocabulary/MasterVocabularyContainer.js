import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MasterVocabularyComponent from './MasterVocabularyComponent';
import './MasterVocabulary.scss';

import {
  updateState,
  addLetter,
} from './master.duck';

const mapStateToProps = state => ({
  word: state.master.word,
  words: state.master.words,
  translation: state.master.translation,
  answer: state.master.answer,
  mistakes: state.master.mistakes,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        updateState,
        addLetter,
      }, dispatch,
    ),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class MasterVocabularyContainer extends PureComponent {
  render() {
    return <MasterVocabularyComponent {...this.props} />;
  }
}

export default MasterVocabularyContainer;
