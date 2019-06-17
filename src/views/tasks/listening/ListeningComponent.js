import React, { PureComponent } from 'react';
import cn from 'classnames';

import TextViewer from '../../../components/TextViewer';

class ListeningComponent extends PureComponent {
  render() {
    const { listeningTasks } = this.props;
    return (
      <div className={cn('Listening', this.props.className)}>
        {listeningTasks.map(task => (
          <TextViewer key={task.id} text={task.text} />
        ))}
      </div>
    );
  }
}

export default ListeningComponent;
