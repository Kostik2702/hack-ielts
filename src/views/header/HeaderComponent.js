import React, { PureComponent, Fragment } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import MenuButton from '../../components/menuButton';
import FacebookButton from '../../components/facebookBtn/FacebookButton';
import logo from '../../assets/logo.svg';

class HeaderComponent extends PureComponent {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className={cn('Header', this.props.className)}>


        <Link className="Header__link" to="/">
          <img className="Header__logo" alt="logo" src={logo} />
        </Link>

        { isAuthenticated && (
          <Fragment>
            <Link className="Header__link" to="/reading">
              <MenuButton label="Reading" />
            </Link>

            <Link className="Header__link" to="/listening">
              <MenuButton label="Listening" />
            </Link>

            <Link className="Header__link" to="/vocabulary">
              <MenuButton label="Vocabulary" />
            </Link>

            <Link className="Header__link" to="/master">
              <MenuButton label="Master Vocabulary" />
            </Link>
          </Fragment>
        )}

        <div className="Header__rightSection">
          { isAuthenticated
            ? (
              <MenuButton onClick={this.props.handleLogOut} label="Log out" />
            )
            : (

              <FacebookButton />
            )
          }
        </div>

      </div>
    );
  }
}

export default HeaderComponent;
