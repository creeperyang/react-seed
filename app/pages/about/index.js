import React, { Component } from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import Paper from 'material-ui/lib/paper';
import Slider from 'material-ui/lib/slider';

import styles from './style.scss';

class AboutPage extends Component {
    constructor() {
        super();

        this.state = {
            size: 0.5
        };
    };

    handleSliderChange = (event, value) => {
        this.setState({
            size: value
        });
    };

    render () {
        return (
            <div>
                <Paper zDepth={2} className={styles.paper}>
                    <Slider name={'demo'} onChange={this.handleSliderChange} value={.5} min={0.2} max={1}/>
                    <CircularProgress mode="indeterminate" size={this.state.size * 3}/>
                </Paper>
            </div>
        );
    }
}

export default AboutPage;
