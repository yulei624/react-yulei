import React from 'react';
import { Route,Switch } from 'react-router-dom'
import Chang from '../../pic/chang'
import Zheng from '../../pic/zheng'
export default class Pic extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/pic/chang' component={Chang}></Route>
                <Route path='/pic/zheng' component={Zheng}></Route>
            </Switch>
        );
    }
}

