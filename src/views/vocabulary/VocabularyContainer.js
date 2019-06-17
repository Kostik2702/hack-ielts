import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VocabularyComponent from './VocabularyComponent';

import './Vocabulary.scss';

const mapStateToProps = state => ({
  state,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ }, dispatch),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class VocabularyContainer extends PureComponent {
  componentDidMount() {
  }

  render() {
    return <VocabularyComponent {...this.props} />;
  }
}

export default VocabularyContainer;
