import React, { PropTypes } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
// theme
import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

import Menu from '../../components/menu';

class AppRoot extends React.Component {
    constructor() {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(DefaultRawTheme)
        };
    };
    static propTypes = {
        children: PropTypes.object
    };
    static childContextTypes = {
        muiTheme: PropTypes.object
    };
    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    };

    render() {
        return (
            <div>
                {/* comment: public components */}
                <AppBar
                    title="UED Team"
                    iconElementLeft={<Menu muiTheme={ this.state.muiTheme } />}
                    iconElementRight={
                        <IconMenu
                            iconButtonElement={
                              <IconButton><MoreVertIcon /></IconButton>
                            }
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        >
                            <MenuItem primaryText="Refresh" />
                            <MenuItem primaryText="Help" />
                            <MenuItem primaryText="Sign out" />
                        </IconMenu>
                    }
                />
                {/* comment: child components */}
                { this.props.children }
            </div>
        );
    }
}

export default AppRoot;
