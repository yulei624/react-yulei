import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "./index.less"
import { Menu, Icon } from 'antd'
import menuList from "../../config/menuConfig"
const { SubMenu } = Menu;
class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                // 没有childen
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // 有childen
                return (
                    <SubMenu key={item.key} title={
                        <span><Icon type={item.icon}></Icon><span>{item.title}</span></span>
                    }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    componentDidCatch() {
        this.menuList = this.getMenuNodes(menuList)
    }
    render() {
        // 得到请求的pathname
        let path = this.props.location.pathname;
        return (
            <div className="left-nav">
                <Link to="/">
                    <header className="left-nav=header">
                        <h1>XXX管理后台</h1>
                    </header>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)













