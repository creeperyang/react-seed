import React, { PropTypes } from 'react';

class AppRoot extends React.Component {
    constructor() {
        super();
    };
    static propTypes = {
        children: PropTypes.object
    };

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

export default AppRoot;
