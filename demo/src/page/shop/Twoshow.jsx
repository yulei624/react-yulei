import React from 'react';
import { Card, Button, Select, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { getShopInfo, getSearchShopInfo, UpdateStatus } from '../../ajax/api'
import { PAGE_SIZE } from '../../constants/constant'

const { Option } = Select;
export default class Twoshow extends React.Component {
    state = {
        dataSource: [], // --- 表格数据(商品数据)
        loading: false, //--- 请求数据加载按钮
        total: "", //--- 一共有多少条数据
        productType: 'productName',
        productText: ''
    }
    render() {
        // --- 初始化Card头部数据
        const extra = (
            <div>
                <Select value={this.state.productType} style={{ width: 160 }} onChange={(value) => this.setState({ productType: value })}>
                    <Option value='productName'>按分类名称搜索</Option>
                    <Option value='productDesc'>按商品描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 160 }} onChange={(e) => this.setState({ productText: e.target.value })} />
                <Button type='primary' onClick={() => this.getDataSource("1")}>搜索</Button>
                <Button className='btns' onClick={() => this.props.history.push("/admin/shop/two/add")} type='primary'><PlusOutlined />添加商品</Button>
            </div>
        )
        const { dataSource, loading, total } = this.state
        return (
            <div>
                <Card extra={extra} style={{ width: 1000 }}>
                    <Table
                        bordered
                        columns={this.columns}
                        dataSource={dataSource}
                        pagination={{ defaultPageSize: PAGE_SIZE, total, showQuickJumper: true, onChange: this.getDataSource }}
                        loading={loading}
                        rowKey="_id"
                    />
                </Card>
            </div>
        );
    }
    // --- 初始化表头
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                width: 280,
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                width: 280,
                dataIndex: "desc"
            },
            {
                title: '价格',
                width: 180,
                dataIndex: "price",
                render: (price) => {
                    return (
                        "￥" + price
                    )
                }
            },
            {
                title: '状态',
                width: 120,
                render: (text) => (
                    <div>
                        <Button type="primary" onClick={() => this.changeStatus(text._id, text.status)}>{text.status === 1 ? "下架" : "上架"}</Button>
                        <p>{text.status === 1 ? "在售" : "已下架"}</p>
                    </div>
                )
            },
            {
                title: '操作',
                width: 150,
                render: (text) => (
                    <div>
                        <div className="editBtn" onClick={() => this.props.history.push({ pathname: "/admin/shop/two/detail", query: { text } })}>详情</div>
                        <div className="editBtn" onClick={() => this.props.history.push({ pathname: "/admin/shop/two/add", state: { text } })}>修改</div>
                    </div>
                )
            }
        ];
    };
    changeStatus = async (id, status) => {
        if (status === 1) {
            status = 2
        } else if (status === 2) {
            status = 1
        }
        let res = await UpdateStatus(id, status)
        if (res.status === 0) {
            this.getDataSource(this.pageNum)
        }
    }
    // --- 钩子函数，用来调用初始化表头
    componentWillMount() {
        this.initColumns()
    };
    componentDidMount() {
        this.getDataSource(1)
    }
    // --- 获取表格数据
    getDataSource = async (pageNum) => {
        this.pageNum=pageNum
        let { productType, productText } = this.state
        this.setState({
            loading: true
        })
        let res;
        if (productText) {
            res = await getSearchShopInfo(pageNum, PAGE_SIZE, productType, productText)
        } else {
            res = await getShopInfo(pageNum, PAGE_SIZE)
        }
        if (res.status === 0) {
            this.setState({
                loading: false,
                dataSource: res.data.list,
                total: res.data.total
            })
        }
    }
}