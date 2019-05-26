import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WritingComponent from './WritingComponent'

import { fetchWritingTasks } from '../tasks.duck';

import './Writing.scss'

const mapStateToProps = state => {
  return {
    writingTasks: state.tasks.writingTasks,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchWritingTasks }, dispatch)
  }
}

@connect(mapStateToProps, mapActionsToProps)
class WritingContainer extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchWritingTasks();
  }

  render () {
    return <WritingComponent {...this.props} />
  }
}

export default WritingContainer;