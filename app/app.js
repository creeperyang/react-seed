import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRoutes from './routes.js';
import './styles/app.css';

class App {

    constructor(options) {
        this.state = options.state;
    }

    render(element) {
        var appRootElement = React.createElement(AppRoutes, {
            state: this.state
        });

        if (element) {
            return ReactDOM.render(appRootElement, element);
        }

        return ReactDOMServer.renderToString(appRootElement);
    }

    renderToDOM(element) {
        if (!element) {
            throw new Error('App.renderToDOM: element is required!');
        }
        this.render(element);
    }

    renderToString() {
        return this.render();
    }

}

export default App;


const main = () => {
    injectTapEventPlugin();

    const state = {
        members: [{
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
        }]
    };
    const app = new App({ state });

    app.renderToDOM(document.getElementById('app'));
};

main();
