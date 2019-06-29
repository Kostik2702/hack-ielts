import React, { PureComponent } from 'react';
import cn from 'classnames';
import Flag from 'react-flagkit';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUserConfig } from '../../ducks/app.duck';

import './CountrySelector.scss';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateUserConfig }, dispatch),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class CountrySelector extends PureComponent {
  render() {
    return (
      <div className={cn('CountrySelector', this.props.className)}>
        <div className="CountrySelector__box">
          <div className="CountrySelector__ask">
            Please, choose your native language:
          </div>
          <div className="CountrySelector__flags">
            <div
              role="button"
              className="CountrySelector__flag"
              onClick={() => this.props.actions.updateUserConfig({ code: 'UA' })}
            >
              <Flag country="UA" />
            </div>
            <div
              role="button"
              className="CountrySelector__flag"
              onClick={() => this.props.actions.updateUserConfig({ code: 'RU' })}
            >
              <Flag country="RU" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountrySelector;
