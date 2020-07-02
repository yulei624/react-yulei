import React from 'react';
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {getInfoId} from '../../ajax/api'
export default class Twodetail extends React.Component {
    componentDidMount() {
        this.getInfoIdName()
    }
    getInfoIdName = async() => {
        let { pCategoryId,categoryId } = this.props.location.query.text
        let res = await getInfoId(categoryId)
        let suc = await getInfoId(pCategoryId)
        if (res.status === 0 && suc.status === 0) {
            this.setState({
                name:res.data.name+"--->"+suc.data.name
            })
        }
    }
    state = {
        shopItem: {},
        name:''
    }

    render() {
        const extra = (
            <div style={{ fontSize: 18 }}>
                <ArrowLeftOutlined onClick={() => this.props.history.go(-1)} style={{ color: "#00aa98" }} />
                <span style={{ marginLeft: 15 }}>商品详情</span>
            </div>
        )
        return (
            <div>
                <Card extra={extra} style={{ width: 1000 }}>
                    <List split>
                        <List.Item>
                            <span className="detail_sp">商品名称：</span>
                            <span>{this.props.location.query.text.name}</span>
                        </List.Item>
                        <List.Item>
                            <span className="detail_sp">商品描述：</span>
                            <span>{this.props.location.query.text.desc}</span>
                        </List.Item>
                        <List.Item>
                            <span className="detail_sp">商品价格：</span>
                            <span>￥{this.props.location.query.text.price}</span>
                        </List.Item>
                        <List.Item>
                            <span className="detail_sp">所属分类：</span>
                            <span>{this.state.name}</span>
                        </List.Item>
                        <List.Item>
                            <span className="detail_sp">商品图片：</span>
                            {
                                this.props.location.query.text.imgs.map((item,index)=> {
                                    return (
                                        <img key={index+1} style={{ width: 50, height: 50 }} src={item.url} alt={item.name}/>
                                    )
                                })
                            }
                        </List.Item>
                        <List.Item>
                            <span className="detail_sp">商品详情：</span>
                            <div  dangerouslySetInnerHTML={{__html:this.props.location.query.text.detail}}>
                            </div>
                        </List.Item>
                    </List>
                </Card>
            </div>
        );
    }
}