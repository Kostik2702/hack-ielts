import React, { PureComponent } from 'react';
import cn from 'classnames';

import TextViewer from '../../../components/TextViewer';

class ReadingComponent extends PureComponent {
  render() {
    const { readingTasks } = this.props;
    return (
      <div className={cn('Reading', this.props.className)}>
        {readingTasks.map(task => (
          <TextViewer key={task.taskId} text={task.text} />
        ))}
      </div>
    );
  }
}

export default ReadingComponent;
