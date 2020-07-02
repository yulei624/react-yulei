import React from 'react';
import './admin.less'
import { Layout } from 'antd';
import { Route, Switch,Redirect } from 'react-router-dom'
import Home from './other/home'
import Order from './other/order'
import People from './other/people'
import Pic from './other/pic'
import User from './other/user'
import Shop from './other/shop'
import saveMe from '../../units/saveMe';
import Header from './Header'
import Leftnav from './leftNav'
const { Content, Sider } = Layout;


export default class Admin extends React.Component {
    render() {
        if (!saveMe.user) {
            return <Redirect to='/login'></Redirect>
        } else {
            return (
                <div className='admin'>
                    <Layout>
                        <Sider>
                            <div className="logo">YL管理系统</div>
                            <Leftnav></Leftnav>
                        </Sider>
                        <Layout>
                            <Header></Header>
                            <Content>
                                <div className="site-layout-background">
                                    <Switch>
                                        <Route path='/admin/home' component={Home}></Route>
                                        <Route path='/admin/shop' component={Shop}></Route>
                                        <Route path='/admin/order' component={Order}></Route>
                                        <Route path='/admin/user' component={User}></Route>
                                        <Route path='/admin/pic' component={Pic}></Route>
                                        <Route path='/admin/people' component={People}></Route>
                                        <Redirect to='/admin/home'></Redirect>
                                    </Switch>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>,
                </div>
            );
        }
    }
}

