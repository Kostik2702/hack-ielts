import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReadingComponent from './ReadingComponent';

import { fetchReadingTasks } from '../tasks.duck';

import './Reading.scss';

const mapStateToProps = state => ({
  readingTasks: state.tasks.readingTasks,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchReadingTasks }, dispatch),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class ReadingContainer extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchReadingTasks();
  }

  render() {
    return <ReadingComponent {...this.props} />;
  }
}

export default ReadingContainer;
