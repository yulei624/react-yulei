import React from 'react';
import '../../style/admin/header.less'
import { getWeather, getTime } from '../../ajax/api'
import saveMe from '../../units/saveMe'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import { delLocal } from '../../memary/saveLocalstroge'
class Header extends React.Component {
    state = {
        dayPictureUrl: "",
        weather: "",
        nowTime: "",
        userName: saveMe.user.username,
    };
    render() {
        let { dayPictureUrl, weather, nowTime, userName } = this.state;
        let title = this.getTitle()
        // if (!title) {
        //     title="商品"+">"+"商品管理"
        // }
        return (
            <div className='admin_header'>
                <div className="admin_user">
                    <span>欢迎：<span className="admin_user_user">{userName}</span></span>
                    <button onClick={this.goOutLogin}>退出</button>
                </div>
                <div className='admin_time'>
                    <span className="admin_title">{title}</span>
                    <span>{nowTime}</span>
                    <img src={dayPictureUrl} alt="" />
                    <span className='admin_weather'>{weather}</span>
                </div>
            </div>
        );
    };
    getWeatherToHeader = async (city) => {
        let { dayPictureUrl, weather } = await getWeather(city)
        this.setState({
            dayPictureUrl,
            weather
        })
    };
    getTimeToHeader = () => {
        this.intervalId = setInterval(() => {
            let data = getTime()
            let res = new Date(data)
            let nowTime = res.getFullYear() + "-" + (res.getMonth() + 1) + "-" + res.getDate() + " " + res.getHours() + ":" + res.getMinutes() + ":" + res.getSeconds()
            this.setState({
                nowTime
            })
        }, 300)
    }
    componentDidMount() {
        this.getWeatherToHeader('郑州')
        this.getTimeToHeader()
        this.getTitle()
    }
    getTitle = () => {
        let pathName = this.props.location.pathname
        let titles = ''
        menuList.forEach(item => {
            if (item.key === pathName && !item.children) {
                titles = item.title
            } else if (item.children) {
                let names = item.title
                let ress = item.children.find(items => items.key === pathName);
                if (ress) {
                    titles = names + ">" + ress.title;
                }
            }
        })
        return titles
    };
    componentWillUnmount() {
        clearInterval(this.intervalId)
    };
    goOutLogin = () => {
        Modal.confirm({
            content: 'Are you sure 退出本系统？',
            cancelText:"取消",
            okText:"确定",
            onOk: () => {
                menuList.user = {};
                delLocal();
                this.props.history.go("/login")
            },
            onCancel() {
            }
        });
    }
}
export default withRouter(Header)
