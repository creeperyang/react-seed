import React from 'react';

import Paper from 'material-ui/lib/paper';

import styles from './style.scss';

class NoMatch extends React.Component {
    render () {
        return (
            <Paper className={styles.paper}>
                <p>You are lost.</p>
            </Paper>
        )
    }
}

export default NoMatch;
