import React from 'react';
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {removePic} from '../ajax/api'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false, //---控制图片显示隐藏(弹出弹框)
        previewImage: '', //--- 弹出框中大图片的url
        previewTitle: '',
        fileList: []
    };
    //---- 取消弹框
    handleCancel = () => this.setState({ previewVisible: false });
    //---- 点击小眼睛(预览)
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    // ---- onChange时调用的函数  上传中、完成、失败都会调用这个函数。
    handleChange = async ({ file, fileList }) => {
        if (file.status === 'done') {
            let result = file.response
            if (result.status === 0) {
                message.success("上传图片成功...")
                file=fileList[fileList.length-1]
                file.name=result.data.name
                file.url = result.data.url
            }
        } else if(file.status === 'error'){
            message.error("上传图片失败...")
        } else if (file.status === 'removed') {
            let res = await removePic(file.name)
            if (res.status === 0) {
                message.success("删除图片成功")
            } else {
                message.error("删除图片失败")
            }
        }
        this.setState({ fileList })
    };
    componentDidMount() {
        if(this.props.picList.imgs){
            this.setState({
                fileList:this.props.picList.imgs
            })
        }
    }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div style={{ marginTop: 75 }} className="clearfix">
                <Upload
                    action="/manage/img/upload"
                    listType="picture-card"
                    accept="image/*" //---只能看到图片，上传文件看不到
                    name="image"  //--- 上传后台文件名
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}