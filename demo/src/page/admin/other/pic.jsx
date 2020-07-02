import React from 'react';
import { Route,Switch } from 'react-router-dom'
import Zhu from '../../pic/zhu'
import Zhe from '../../pic/zhe'
import Bing from '../../pic/bing'
export default class Pic extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/admin/pic/zhu' component={Zhu}></Route>
                <Route path='/admin/pic/zhe' component={Zhe}></Route>
                <Route path='/admin/pic/bing' component={Bing}></Route>
            </Switch>
        );
    }
}

