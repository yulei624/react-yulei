import React from 'react';
import { getOneList, addOneList, changeFirstName } from '../../ajax/api'
import { Card, Table, Button, Modal, Input, Select, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import '../../common/common.css'
const { Option } = Select;
export default class One extends React.Component {
    state = {
        columns: [], //--- 表头
        firstList: [], //--- 一级分类列表
        loading: false, //--- 控制table中是否处于加载状态中
        visible: false, //--- 控制添加框是否显示
        confirmLoading: false, //--- 控制添加框中的添加是否处于加载中
        confirmLoadingTwo: false, //--- 控制修改框中的添加是否处于加载中
        visibleTwo: false, //--- 控制修改框是否显示
        firstId: '', //--- 一级分类id
        secondList: [], //--- 二级分类列表
        visibleThree: false,
    }
    render() {
        const extra = (<Button onClick={this.addList} type='primary'><PlusOutlined />添加</Button>)
        let { columns, loading, firstList, visible, confirmLoading, visibleTwo, confirmLoadingTwo, visibleThree } = this.state
        return (
            <Card title="我是一级分类列表" extra={extra} style={{ width: 800 }}>
                <Table
                    bordered
                    loading={loading}
                    columns={columns}
                    dataSource={firstList}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }} //---分页器 每页5条，可以点击跳转
                ></Table>
                <Modal
                    title="添加分类"
                    visible={visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    cancelText="取消"
                    okText="确定"
                >
                    <Select defaultValue='请选择' style={{ width: 200 }} onChange={this.selectValue}>
                        <Option key='0' value='0'>一级分类</Option>
                        {this.initSelect()}
                    </Select>
                    <Input ref={(inp) => this.listTitle = inp} placeholder="请输入分类名称" />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={visibleTwo}
                    onCancel={this.handleCancelTwo}
                    onOk={this.handleOkTwo}
                    confirmLoading={confirmLoadingTwo}
                    cancelText="取消"
                    okText="确定"
                >
                    <Input ref="changeFirstId" placeholder="请输入你要修改的名称" />
                </Modal>
                <Modal
                    title="二级分类"
                    visible={visibleThree}
                    onCancel={this.handleCancelThree}
                    footer={null}
                >
                    {this.getSecondList()}
                </Modal>
            </Card>
        );
    };
    // --- 获取一级分类列表
    getFirstList = async () => {
        this.setState({
            loading: true
        })
        let res = await getOneList()
        if (res.data.length) {
            res.data.map((item, index) => {
                return res.data[index] = {
                    key: index + 1,
                    parentId: item.parentId,
                    _id: item._id,
                    name: item.name,
                    __v: item.__v
                }
            })
            res = {
                status: res.status,
                data: res.data
            }
            this.setState({
                loading: false,
                firstList: res.data
            })
        }
    };
    componentDidMount() {
        this.getFirstList()
    };
    componentWillMount() {
        this.initColumns();
    };
    // --- 初始表头
    initColumns = () => {
        const columns = [
            {
                key: "1",
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '执行的操作',
                width: 300,
                render: (text) => (
                    <span id="spBtn">
                        <button className="firstBtn" onClick={() => this.changeFirstList(text)}>修改这个分类</button>
                        <button className="firstBtn" onClick={() => this.lookTwoList(text)}>查看详细分类</button>
                    </span>
                )
            }
        ];
        this.setState({ columns })
    };
    // ========================================================================
    // --- 点击添加按钮弹出添加框
    addList = () => {
        this.setState({
            visible: true
        })
        this.initSelect()
    };
    //--- 关闭添加框
    handleCancel = () => {
        this.setState({
            visible: false,
        })
        this.listTitle.state.value = ''
    };
    // --- 点击添加框中确定按钮
    handleOk = async () => {
        this.setState({
            confirmLoading: true,
        });
        let times = () => {
            setTimeout(() => {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }, 1000);
        }
        let categoryName = this.listTitle.state.value
        if (this.state.firstId && categoryName && this.state.firstId !== '0') {
            let ids = this.state.firstId
            let categoryName = this.listTitle.state.value
            let suc = await addOneList(ids, categoryName)
            if (suc.data._id) {
                this.listTitle.state.value = ''
                times()
            }
        } else if (this.state.firstId === '0' && categoryName) {
            let result = await addOneList(this.state.firstId, categoryName)
            if (result.data._id) {
                this.getFirstList()
                this.listTitle.state.value = ''
                times()
            }
        } else {
            alert("你不输入内容添加个毛线啊")
            this.setState({
                confirmLoading: false,
            });
        }

    };
    // ========================================================================
    // --- 修改一级分类 (拿到每行数据的 _id)
    changeFirstList = (value) => {
        this.setState({
            visibleTwo: true
        })
        this.setState({
            firstId: value._id
        })
    }
    //--- 关闭修改框
    handleCancelTwo = () => {
        this.setState({
            visibleTwo: false,
        })
        this.refs.changeFirstId.state.value = ''
    };
    // --- 点击修改框中确定按钮
    handleOkTwo = async () => {
        this.setState({
            confirmLoadingTwo: true,
        });
        setTimeout(() => {
            this.setState({
                visibleTwo: false,
                confirmLoadingTwo: false,
            });
        }, 1000);
        let categoryName = this.refs.changeFirstId.state.value
        let categoryId = this.state.firstId
        let item = await changeFirstName(categoryId, categoryName)
        if (item.status === 0) {
            this.getFirstList()
            this.refs.changeFirstId.state.value = ''
            this.setState({
                firstId: ''
            })
        }
    }
    // --- 获取Select选择器选中一级类名的id
    selectValue = (value) => {
        this.setState({
            firstId: value
        })
    }
    // --- 初始化添加框中Select选择器一级分类名字
    initSelect = () => {
        let firstList = this.state.firstList
        return firstList.map((item) => {
            return (
                <Option key={item.key} value={item._id}>{item.name}</Option>
            )
        })
    };
    // =========================================================================
    // --- 点击查看二级分类按钮
    lookTwoList = async (text) => {
        let id = text._id
        let twoList = await getOneList(id)
        if (twoList.status === 0) {
            this.setState({
                secondList: twoList.data,
                visibleThree: true
            })
        }
    };
    // --- 关闭查看二级分类框
    handleCancelThree = () => {
        this.setState({
            visibleThree: false,
        })
    };
    // --- 从state中获取二级分类列表
    getSecondList = () => {
        let secondList = this.state.secondList
        let arr = secondList.map((item) => {
            return item.name
        })
        return (<List dataSource={arr}
            renderItem={item => <List.Item>{item}</List.Item>}
        />)
    }

}
