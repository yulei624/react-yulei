import React from 'react';
import { Route, Switch } from 'react-router-dom'
import One from '../../shop/one'
import Two from '../../shop/two'
import Three from '../../shop/three'
export default class Shop extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/shop/one' component={One}></Route>
                <Route path='/shop/two' component={Two}></Route>
                <Route path='/shop/three' component={Three}></Route>
            </Switch>
        );
    }
}

