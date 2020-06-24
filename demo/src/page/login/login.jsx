import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
export default class Login extends React.Component {

    render() {
        return (
            <div className='login'>
                <h1>YL管理系统</h1>
                <div className='forms'>
                    <h2>用户登录</h2>
                    <Form name="normal_login" className="login-form" onFinish={this.onFinish}>
                        <Form.Item name="username"
                            rules={[{ required: true, message: '请输入你的用户名' },
                            { max: 14, message: '最大为14位' },
                            { min: 6, message: '最小为6位' },
                            { pattern: /[0-9A-Za-z]{6,14}$/, message: '必须为数字和字母' }
                          ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                             />
                        </Form.Item>
                        <Form.Item name='password' rules={[{ required: true, message: '请输入你的密码' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    };
    NormalLoginForm = () => {

    };
    onFinish = values => {
        console.log(values);
    };
}

