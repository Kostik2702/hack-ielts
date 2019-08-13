import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MasterUnitComponent from './MasterUnitComponent';
import Constructor from '../constructor/Constructor';
import './MasterUnit.scss';

import {
  addLetter,
  fetchConstructorSet,
  units,
  updateState,
} from '../master.duck';

const mapStateToProps = state => ({
  word: state.master.word,
  words: state.master.words,
  translation: state.master.translation,
  answer: state.master.answer,
  mistakes: state.master.mistakes,
  unitProgress: state.master.unitProgress,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        updateState,
        addLetter,
        fetchConstructorSet,
      }, dispatch,
    ),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class MasterUnitContainer extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchConstructorSet();
  }

  render() {
    let UnitComponent = Constructor;
    const { unit } = this.props.match.params;
    let unitProps = {};

    if (unit === units.constructor) {
      UnitComponent = Constructor;
      const {
        actions, words, translation, answer, mistakes,
      } = this.props;
      unitProps = {
        actions,
        words,
        translation,
        answer,
        mistakes,
        addLetter: actions.addLetter,
      };
    }

    return (
      <MasterUnitComponent
        UnitComponent={UnitComponent}
        unitProps={unitProps}
        {...this.props}
      />
    );
  }
}

export default MasterUnitContainer;
