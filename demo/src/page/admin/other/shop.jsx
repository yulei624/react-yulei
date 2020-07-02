import React from 'react';
import { Route, Switch } from 'react-router-dom'
import One from '../../shop/one'
import Two from '../../shop/two'
export default class Shop extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/admin/shop/one' component={One}></Route>
                <Route path='/admin/shop/two' component={Two}></Route>
            </Switch>
        );
    }
}

