import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default class Modal extends PureComponent {
  render() {
    return <ReactModal {...this.props} />;
  }
}
