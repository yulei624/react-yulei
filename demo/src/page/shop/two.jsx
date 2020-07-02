import React from 'react';
import Twoshow from './Twoshow'
import Twoadd from './TwoAdd'
import Twodetail from './Twodetail'
import { Route, Switch ,Redirect} from 'react-router-dom'
import './two.less'
export default class Two extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/admin/shop/two' exact component={Twoshow}></Route>
                    <Route path='/admin/shop/two/add' component={Twoadd}></Route>
                    <Route path='/admin/shop/two/detail' component={Twodetail}></Route>
                    <Redirect to='/admin/shop/two'></Redirect>
                </Switch>
            </div>

        );
    }
   
}

