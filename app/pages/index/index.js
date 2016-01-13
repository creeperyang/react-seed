import React, { PropTypes, Component } from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import GroupWork from 'material-ui/lib/svg-icons/action/group-work';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';

// theme
import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

// styles
import styles from './style.scss';


class IndexPage extends Component {
    constructor() {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(DefaultRawTheme)
        };
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
        const members = [{
            name: 'Bobo',
            level: 5,
            email: 'bobo@demo.com'
        }, {
            name: 'chunxia',
            level: 4,
            email: 'cx@demo.com'
        }, {
            name: 'creeper',
            level: 4,
            email: 'cp@demo.com'
        }, {
            name: 'kun',
            level: 4,
            email: 'kun@demo.com'
        }, {
            name: 'yifan',
            level: 4,
            email: 'xiaofanzhang@demo.com'
        }, {
            name: 'wenb',
            level: 4,
            email: 'wenb@demo.com'
        }];
        const [leader] = members;
        return (
            <Card initiallyExpanded={true} className={styles.card}>
                <CardHeader
                    title="The Team"
                    subtitle="ued/fe"
                    actAsExpander={true}
                    showExpandableButton={true} />
                <CardText expandable={true}>
                    <div className={styles.memberList}>
                        <List subheader="Leader">
                            <ListItem
                                primaryText={leader.name}
                                secondaryText={leader.email}
                                rightIcon={<ActionInfo />}
                                leftAvatar={<Avatar>{leader.name[0].toUpperCase()}</Avatar>} />
                        </List>
                        <Divider />
                        <List subheader="Members">
                            {members.map((member, i) => {
                                return (<ListItem
                                    key={'member' + i}
                                    primaryText={member.name}
                                    secondaryText={member.email}
                                    rightIcon={<ActionInfo />}
                                    leftAvatar={<Avatar>{member.name[0].toUpperCase()}</Avatar>} />);
                            })}
                        </List>
                    </div>
                </CardText>
                <CardActions expandable={true} className={styles.actionZone}>
                    <IconButton tooltip="join us!" touch={true} tooltipPosition="top-center">
                        <GroupWork color={Colors.red500} />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default IndexPage;
