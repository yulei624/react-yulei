import React from 'react';
import { Card, Button, Table, Modal, Form, Input, message } from "antd"
import {addPeople,getPeopleList} from '../../../ajax/api'
export default class People extends React.Component {
    state = {
        loading: false, //--- 表格loading效果
        data: [],  //--- 表格数据
        isRadio: false, //--- 改变添加权限按钮
        visible: false, //--- 控制弹出框的开关
    }
    render() {
        const { loading, data, isRadio, visible } = this.state
        const cardTitle = (
            <div>
                <Button type="primary" onClick={this.addPeople} style={{ marginRight: 20 }}>创建角色</Button>
                <Button disabled={isRadio ? false : true} type={isRadio ? 'primary' : ''}>设置角色权限</Button>
            </div>
        )
        return (
            <Card style={{ width: 1000 }} title={cardTitle} >
                <Table
                    rowSelection={{
                        type: "radio", onChange: (text) => {
                            console.log(text)
                            this.setState({
                                isRadio: true
                            })
                        }
                    }
                    }
                    bordered
                    columns={this.columns}
                    dataSource={data}
                    pagination={{ defaultPageSize: 2, showQuickJumper: true }}
                    loading={loading}
                    rowKey="_id"
                />
                <Modal
                    title="添加角色"
                    visible={visible}
                    footer={null}
                    onCancel={this.onCancel}
                >
                    <Form onFinish={this.onFinish}>
                        <Form.Item
                            label="角色名称"
                            name="roleName"
                            rules={[{ required: true, message: '请输入角色名称' }]}
                        ><Input />
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right", marginTop: 10 }}>
                            <Button onClick={this.onCancel} style={{ marginRight: 20 }}>取消</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
    componentWillMount() {
        this.initTable()
    }
    componentDidMount() {
        this.getList()
    }
    // --- 获取角色列表
    getList = async () => {
        this.setState({
            loading:true
        })
        let result = await getPeopleList()
        if (result.status === 0) {
            this.setState({
                loading: false,
                data:result.data
            })
        }
        
    }
    // --- 初始化表头
    initTable = () => {
        this.columns = [
            {
                title: '角色名称',
                width: 280,
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                width: 280,
                dataIndex: 'create_time',
                render: (create_time) => {
                    let res = new Date(create_time)
                    let nowTime = res.getFullYear() + "-" + (res.getMonth() + 1) + "-" + res.getDate() + " " + res.getHours() + ":" + res.getMinutes() + ":" + res.getSeconds()
                    return nowTime
                }
            },
            {
                title: '授权时间',
                width: 280,
                dataIndex: 'create_time',
            },
            {
                title: '授权人',
                width: 160,
                render: () => {
                    return (
                        <span>admin</span>
                    )
                }
            }
        ]
    }
    // --- 添加角色按钮
    addPeople = () => {
        this.setState({
            visible: true
        })
    }
    // --- 点击弹出框确定按钮(表单中的按钮)
    onFinish =async (value) => {
        let res=await addPeople(value.roleName)
        console.log(res)
        if (res.status === 0) {
            message.success("添加角色成功")
            this.setState({
                visible: false,
            })
        }
    }
    // --- 关闭弹出框
    onCancel = () => {
        this.setState({
            visible: false
        })
    }
}

