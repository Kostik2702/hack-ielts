import React, { PureComponent } from 'react';
import cn from 'classnames';

import MenuButton from '../../components/menuButton'
import { Link } from 'react-router-dom'
import FacebookButton from "../../components/FacebookButton";

class HeaderComponent extends PureComponent {
	render() {
		return (
			<div className={cn('Header', this.props.className)}>
				{/*<Link to="/">*/}
					{/*<MenuButton label="Main"/>*/}
				{/*</Link>*/}

				{/*<MenuButton label="Listening"/>*/}

				<Link to="/reading">
					<MenuButton label="Reading"/>
				</Link>

				<Link to="/writing">
					<MenuButton label="Writing"/>
				</Link>

				{/*<MenuButton label="Speaking"/>*/}

				<FacebookButton/>
			</div>
		)
	}
}

export default HeaderComponent;