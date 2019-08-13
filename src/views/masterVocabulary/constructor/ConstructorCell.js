import React, { PureComponent } from 'react';
import Input from '../../../components/input/Input';
import './ConstructorCell.scss';

class ConstructorCell extends PureComponent {
  render() {
    return (
      <Input
        className="ConstructorCell"
        value={this.props.value}
        onChange={w => console.log(w)}
      />
    );
  }
}

export default ConstructorCell;
