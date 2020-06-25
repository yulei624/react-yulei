import React from 'react';
import './admin.less'
import { Layout, Menu } from 'antd';
import { Route, Switch, Link,Redirect } from 'react-router-dom'
import Home from './other/home'
import Order from './other/order'
import People from './other/people'
import Pic from './other/pic'
import User from './other/user'
import Shop from './other/shop'
import { AreaChartOutlined, WindowsOutlined, HomeOutlined, AppstoreOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import saveMe from '../../units/saveMe';
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
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
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1" icon={<HomeOutlined />}><Link to='/home'>首页</Link></Menu.Item>
                                <SubMenu key="sub1" title="商品" icon={<AppstoreOutlined />}>
                                    <Menu.Item key="2"><Link to='/shop/one'>第一件商品</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to='/shop/two'>第二件商品</Link></Menu.Item>
                                    <Menu.Item key="4"><Link to='/shop/three'>第三件商品</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="5" icon={<UserOutlined />}>
                                    <Link to='/user'>用户管理</Link>
                                </Menu.Item>
                                <Menu.Item key="6" icon={<SafetyOutlined />}>
                                    <Link to='/people'>角色管理</Link>

                                </Menu.Item>
                                <SubMenu key="sub2" title="图形图标" icon={<AreaChartOutlined />}>
                                    <Menu.Item key="7"><Link to='/pic/chang'>长方形</Link></Menu.Item>
                                    <Menu.Item key="8"><Link to='/pic/zheng'>正方形</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="9" icon={<WindowsOutlined />}><Link to="/order">订单管理</Link></Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content>

                                <div className="site-layout-background">
                                    <Switch>
                                        <Route path='/home' component={Home}></Route>
                                        <Route path='/shop' component={Shop}></Route>
                                        <Route path='/order' component={Order}></Route>
                                        <Route path='/user' component={User}></Route>
                                        <Route path='/pic' component={Pic}></Route>
                                        <Route path='/people' component={People}></Route>
                                        <Redirect from='/' to='/home'></Redirect>
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

