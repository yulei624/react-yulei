import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Admin from './page/admin/admin.jsx'
import Login from './page/login/login.jsx'
import 'antd/dist/antd.less';
import './common/common.css'
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Admin}></Route>
            <Route path='/admin' component={Admin}></Route>
            <Route path='/login' component={Login}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

