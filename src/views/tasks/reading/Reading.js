import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';

import TextViewer from './components/TextViewer';
import { fetchReadingTasks } from '../tasks.duck';

const mapStateToProps = state => {
	return {
		readingTasks: state.tasks.readingTasks,
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ fetchReadingTasks }, dispatch)
	}
}

@connect(mapStateToProps, mapActionsToProps)
class Reading extends PureComponent {
	componentDidMount() {
		this.props.actions.fetchReadingTasks({});
	}

	render() {
		const { readingTasks } = this.props;
		return (
			<div className={cn('Reading', this.props.className)}>
        {readingTasks.map((task) => {
          return (
            <TextViewer key={task.taskId} text={task.text}/>
          )
        })}
			</div>
		)
	}
}

export default Reading;