import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Admin from './page/admin/admin.jsx'
import Login from './page/login/login.jsx'
import 'antd/dist/antd.less';
import './common/common.css'
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' exact component={Admin}></Route>
          <Route path='/login' component={Login}></Route>
        </Switch>
      </div>
    );
  }
}

