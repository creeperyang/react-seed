import React from 'react';

import styles from './style.scss';

class NoMatch extends React.Component {
    render() {
        return (
            <div className={styles.paper}>
                <p>You are lost.</p>
            </div>
        );
    }
}

export default NoMatch;
