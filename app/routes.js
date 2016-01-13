import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import AppRoot from './pages/appRoot';
import IndexPage from './pages/index';
import AboutPage from './pages/about';
import NoMatch from './pages/noMatch';

class AppRoutes extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Route path="/" component={AppRoot}>
                    <IndexRoute component={IndexPage}/>
                    <Route path="about" component={AboutPage} />
                    <Route path="*" component={NoMatch} />
                </Route>
            </Router>
        );
    }
}

export default AppRoutes;
