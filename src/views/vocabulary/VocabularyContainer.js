import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VocabularyComponent from './VocabularyComponent';
import { fetchVocabulary, addNewWord } from './vocabulary.duck';

import './Vocabulary.scss';
import './list/VocabularyList.scss';

const mapStateToProps = state => ({
  words: state.vocabulary.words,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchVocabulary, addNewWord }, dispatch),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class VocabularyContainer extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchVocabulary();
  }

  render() {
    return <VocabularyComponent {...this.props} />;
  }
}

export default VocabularyContainer;
