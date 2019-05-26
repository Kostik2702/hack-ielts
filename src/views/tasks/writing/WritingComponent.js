import React, { PureComponent } from 'react';
import cn from 'classnames';

import TextViewer from '../../../components/TextViewer';

class WritingComponent extends PureComponent {
	render() {
		const { writingTasks } = this.props;
		return (
			<div className={cn('Writing', this.props.className)}>
        {writingTasks.map((task) => {
          return (
            <TextViewer key={task.id} text={task.text}/>
          )
        })}
			</div>
		)
	}
}

export default WritingComponent;