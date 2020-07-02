import React from 'react';
import { Card, Form, Input, Button, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Editor from 'react-umeditor'
import { getOneList, addShops,updateShops } from '../../ajax/api'
import PicturesWall from '../../components/Upload'
export default class Twoadd extends React.Component {
    state = {
        content: '', //--- 富文本编辑器的内容
        options: [], //--- Cascader组件初始化数据
        idArr: [], //--- 两个所需要传递的id
        picArrs: []
    }
    // ---- 富文本编辑器配置
    getIcons = () => {
        var icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | superscript subscript | ",
            "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
            "horizontal date time  | image emotion spechars | inserttable"
        ]
        return icons;
    }
    getQiniuUploader=()=>{
        return {
            url:'http://upload.qiniu.com',
            type:'qiniu',
            name:"file",
            request: "image_src",
            qiniu:{
                app:{
                    Bucket:"liuhong1happy",
                    AK:"l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
                    SK:"eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
                },
                domain:"http://o9sa2vijj.bkt.clouddn.com",
                genKey:function(options){
                    return options.file.type +"-"+ options.file.size +"-"+ options.file.lastModifiedDate.valueOf() +"-"+ new Date().valueOf()+"-"+options.file.name;
                }
            }
        }
    }
    // ---- 定义一个容器，接收上传图片组件传过来的数据
    constructor(props) {
        super(props)
        this.picture = React.createRef();
    }
    render() {
        // --- 富文本编辑器配置 start
        let { content, options } = this.state
        let { text } = this
        const extra = (
            <div style={{ fontSize: 18 }}>
                <ArrowLeftOutlined onClick={() => this.props.history.go(-1)} style={{ color: "#00aa98" }} />
                <span style={{ marginLeft: 15 }}>{this.isUpdate ? "修改商品" : "添加商品"}</span>
            </div>
        )
        var icons = this.getIcons();
        var uploader = this.getQiniuUploader();
        var plugins = {
            image:{
                uploader:uploader
            }
        }
        var count = 100;
        var editors = [];
        for(var i=0;i<count;i++){
            editors.push({
                icons:icons,
                plugins:plugins
            })
        }
        // -------- end
        return (
            <div>
                <Card extra={extra} style={{ width: 1000, height: 620 }}>
                    <Form name="basic" onFinish={this.onFinish}>
                        <Form.Item label="商品名称" name="name" initialValue={this.isUpdate ? text.name : ""}>
                            <Input placeholder="请输入商品名称" />
                        </Form.Item>
                        <Form.Item label="商品描述" name="desc" initialValue={this.isUpdate ? text.desc : ""}>
                            <Input.TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 2 }} />
                        </Form.Item>
                        <Form.Item label="商品价格" name="price" initialValue={this.isUpdate ? text.price : ""}>
                            <Input type='number' addonAfter="元" placeholder="请输入商品价格" />
                        </Form.Item>
                        <Form.Item label="商品分类" name="listId" initialValue={this.isUpdate ? this.state.idArr : []}>
                            <Cascader
                                options={options}
                                expandTrigger="click"
                                onChange={this.cascaderChange}
                            />
                        </Form.Item>
                        <Form.Item label="商品图片" >
                            <PicturesWall picList={this.isUpdate ? this.state.picArrs : []} ref={this.picture}></PicturesWall>
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                    <h1>商品详情：</h1>
                    <Editor ref="editor"
                        style={{ width: 600 }}
                        ref="editor"
                        icons={icons}
                        value={content}
                        defaultValue={this.isUpdate ? text.detail : ''}
                        onChange={this.edutChange}
                        plugins={plugins} />
                </Card>
            </div>
        );
    };
    // --- Cascade组件中的方法 start
    getFirstId = async () => {
        let res = await getOneList();
        if (res.status === 0) {
            res.data.map(async () => {
                let firstListId = res.data.map((item) => ({
                    value: item._id,
                    label: item.name
                }))
                firstListId.map(async (key) => {
                    let result = await getOneList(key.value)
                    let secondListId = result.data.map((items) => ({
                        value: items._id,
                        label: items.name
                    }))
                    if (secondListId.length) {
                        key.children = secondListId
                    }
                    this.setState({
                        options: firstListId
                    })
                })
            })
        }
    }
    cascaderChange = (value) => {
        // this.setState({
        //     idArr: value
        // })
    }
    // --- Cascade组件中的方法 end
    // --- 钩子函数 start
    componentDidMount() {
        this.getFirstId()
    }
    componentWillMount() {
        if (this.props.location.state) {
            let text = this.props.location.state.text
            this.setState({
                picArrs: text
            })
            this.isUpdate = !!text
            this.text = text || {}
            this.setState({
                idArr: [text.categoryId, text.pCategoryId]
            })
        }
    }
    // --- 钩子函数 end
    // --- 点击表单提交按钮
    onFinish = async (value) => {
        let picArr = this.picture.current.state.fileList
        let categoryId = value.listId[0]
        let pCategoryId = value.listId[1]
        let name = value.name
        let desc = value.desc
        let price = value.price
        let detail = this.state.content
        let imgs = picArr
        if (!this.isUpdate) {
            if (categoryId || pCategoryId || name || desc || price || imgs.length || detail) {
                let result = await addShops(categoryId, pCategoryId, name, desc, price, detail, imgs)
                if (result.status === 0) {
                    message.success("添加成功")
                    this.props.history.replace("/admin/shop/two")
                }
            } else {
                alert("你不填完整你提交个毛线")
            }
        } else {
            let _id=this.text._id
           let res=await updateShops(_id,categoryId, pCategoryId, name, desc, price, detail, imgs)
           if(res.status===0){
            message.success("更新成功")
            this.props.history.replace("/admin/shop/two")
           }else{
            message.error("更新失败")
           }
        }
    }
    // --- 富文本编辑器内容改变时所调的函数
    edutChange = (content) => {
        this.setState({
            content
        })
    }
}

