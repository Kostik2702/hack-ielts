import React, { PureComponent } from 'react';
import cn from 'classnames';

class MasterUnitComponent extends PureComponent {
  render() {
    const { UnitComponent, unitProps, unitProgress } = this.props;
    const { isFinished } = unitProgress;
    return (
      <div className={cn('MasterUnit', this.props.className)}>
        { isFinished
          ? (<div>Finished</div>)
          : (<UnitComponent {...unitProps} />) }
      </div>
    );
  }
}

export default MasterUnitComponent;
