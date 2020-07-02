import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import {
    AreaChartOutlined, BarChartOutlined,LineChartOutlined,
    WindowsOutlined, HomeOutlined, AppstoreOutlined,BuildOutlined,
    SafetyOutlined, UserOutlined,PieChartOutlined,BlockOutlined
} from '@ant-design/icons';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
class Leftnva extends React.Component {
    render() {
        let path = this.props.location.pathname;
        
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
                {/* <Menu.Item key="/admin/home" icon={<HomeOutlined />}><Link to='/admin/home'>首页</Link></Menu.Item>
                <SubMenu key="/admin/shop" title="商品" icon={<AppstoreOutlined />}>
                    <Menu.Item key="/admin/shop/one"><Link to='/admin/shop/one'>第一件商品</Link></Menu.Item>
                    <Menu.Item key="/admin/shop/two"><Link to='/admin/shop/two'>第二件商品</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="/admin/user" icon={<UserOutlined />}>
                    <Link to='/admin/user'>用户管理</Link>
                </Menu.Item>
                <Menu.Item key="/admin/people" icon={<SafetyOutlined />}>
                    <Link to='/admin/people'>角色管理</Link>
                </Menu.Item>
                <SubMenu key="/admin/pic" title="图形图标" icon={<AreaChartOutlined />}>
                    <Menu.Item key="/admin/pic/zhu"><Link to='/admin/pic/zhu'>柱状图</Link></Menu.Item>
                    <Menu.Item key="/admin/pic/zhe"><Link to='/admin/pic/zhe'>折线图</Link></Menu.Item>
                    <Menu.Item key="/admin/pic/bing"><Link to='/admin/pic/bing'>饼状图</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="/admin/order" icon={<WindowsOutlined />}><Link to="/admin/order">订单管理</Link></Menu.Item> */}
                {this.getNav(menuList)}
            </Menu>
        );
    };
    getNav = (menuLists) => {
        return menuLists.map((item) => {
            if (!item.children) {
                // return (
                //     <Menu.Item key={item.key}><Link to={item.key}>
                //         {item.title}
                //     </Link></Menu.Item>
                // )
                switch (item.key) {
                    case '/admin/home':
                        return (
                            <Menu.Item key={item.key} icon={<HomeOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/user':
                        return (
                            <Menu.Item key={item.key} icon={<UserOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/people':
                        return (
                            <Menu.Item key={item.key} icon={<SafetyOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/order':
                        return (
                            <Menu.Item key={item.key} icon={<WindowsOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/shop/one':
                        return (
                            <Menu.Item key={item.key} icon={<BlockOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/shop/two':
                        return (
                            <Menu.Item key={item.key} icon={<BuildOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/pic/zhu':
                        return (
                            <Menu.Item key={item.key} icon={<BarChartOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/pic/zhe':
                        return (
                            <Menu.Item key={item.key} icon={<LineChartOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    case '/admin/pic/bing':
                        return (
                            <Menu.Item key={item.key} icon={<PieChartOutlined />}> <Link to={item.key}>
                                {item.title}
                            </Link></Menu.Item>
                        );
                    default:
                        return null
                }
            } else {
                // return (
                //     <SubMenu key={item.key} title={item.title}>
                //         {this.getNav(item.children)}
                //     </SubMenu>
                // )
                switch (item.key) {
                    case '/admin/shop':
                        return (
                            <SubMenu key={item.key} title={item.title} icon={<AppstoreOutlined />}>
                                {this.getNav(item.children)}
                            </SubMenu>
                        );
                    case '/admin/pic':
                        return (
                            <SubMenu key={item.key} title={item.title} icon={<AreaChartOutlined />}>
                                {this.getNav(item.children)}
                            </SubMenu>
                        )
                    default:
                        return null
                }
            }
        })
    };

}
export default withRouter(Leftnva)



