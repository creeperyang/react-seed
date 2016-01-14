import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import ImportantDevice from 'material-ui/lib/svg-icons/action/important-devices';

import styles from './style.scss';
import logo from './logo.png';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            muiTheme: (this.context && this.context.muiTheme) ? this.context.muiTheme : this.props.muiTheme
        };
    };

    static propTypes = {
        muiTheme: PropTypes.object
    };
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    };

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {
        let themeVariables = this.state.muiTheme.appBar;
        let iconStyle = {
            fill: themeVariables.textColor,
            color: themeVariables.textColor
        };

        return (
            <div>
                <IconButton iconStyle={ iconStyle } onTouchTap={ this.handleToggle }><NavigationMenu /></IconButton>
                <LeftNav
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={open => this.setState({ open })}
                >
                    <h2 className={styles.title}><ImportantDevice /> UED</h2>
                    <MenuItem onTouchTap={this.handleClose}><Link className={styles.link} to="/">Home</Link></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><Link className={styles.link} to="/about">About</Link></MenuItem>
                    <MenuItem onTouchTap={this.handleClose}><Link className={styles.link} to="/404">404</Link></MenuItem>
                    <div className={styles.logo}>
                        <img src={logo}/>
                    </div>
                </LeftNav>
            </div>
        );
    };
}
