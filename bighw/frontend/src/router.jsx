import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Index from './pages/index';
import Launch from './pages/launch';
import View from './pages/view';
import MyLaunchs from './pages/mylaunchs';
import Create from './pages/create';
import Bid from './pages/bid';
import Former from './pages/former_owners';
import Mynfts from './pages/my_nfts';
import Claim from './pages/claim';
const PageRouter = () => {
    return (
        <Router>
            <Route path="/" exact render={() => <Redirect to="/index" />}/>
            <Route path='/index' component={Index} />
            <Route path='/launch' component={Launch} />
            <Route path='/view' component={View} />
            <Route path='/mylaunchs' component={MyLaunchs} />
            <Route path='/create' component={Create}/>
            <Route path='/bid' component={Bid}/>            
            <Route path='/former_owners' component={Former}/>
            <Route path='/my_nfts' component={Mynfts}/>
            <Route path='/claim' component={Claim}/>
        </Router>
    );
}

export default PageRouter;