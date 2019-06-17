import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ListeningComponent from './ListeningComponent';

import './Listening.scss';

const mapStateToProps = state => ({
  listeningTasks: state.tasks.listeningTasks,
});

@connect(mapStateToProps)
class ListeningContainer extends PureComponent {
  render() {
    return <ListeningComponent {...this.props} />;
  }
}

export default ListeningContainer;
