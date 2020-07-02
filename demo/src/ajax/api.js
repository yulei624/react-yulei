import ajax from './axios'
import jsonp from 'jsonp'
import { message } from 'antd'
// ---- 获取用户信息
export const userLogin = (username,password) => {
    return ajax('/login',{username,password},'POST')
}
// ---- 获取天气（记住是jsonp发出的请求，不是ajax）
export const getWeather = (city) => {
    return new Promise((resolve,reject) => {
        let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            if (data.status === 'success') {
                let { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                message.error("获取天气失败")
            }
        })
    })
}
// ---- 获取时间 
export const getTime = () => {
    return Date.now()
}
// ---- 获取一级列表
export const getOneList = (parentId) => {
    if(!parentId){
        return ajax('/manage/category/list',{})
    }else{
        return ajax('/manage/category/list',{parentId})
    }
    
}
// ---- 添加一级分类
export const addOneList = (parentId,categoryName) => {
    return ajax('/manage/category/add',{parentId,categoryName},'POST')
}
// ---- 修改一级分类名称
export const changeFirstName = (categoryId,categoryName) => {
    return ajax('/manage/category/update',{categoryId,categoryName},'POST')
}
// ---- 获取商品信息
export const getShopInfo = (pageNum,pageSize) => {
    return ajax('/manage/product/list',{pageNum,pageSize})
}
// ---- 根据搜索获取商品信息
export const getSearchShopInfo = (pageNum,pageSize,productType,productText) => {
    return ajax('/manage/product/search', {
        pageNum,
        pageSize,
        [productType]:productText
    })
}
// ---- 更新上架下架状态
export const UpdateStatus = (productId,status) => {
    return ajax('/manage/product/updateStatus', {productId,status},"POST")
}
// ---- 根据分类ID获取分类
export const getInfoId = (categoryId) => {
    return ajax('/manage/category/info', {categoryId})
}
// ---- 添加商品
export const addShops = (categoryId,pCategoryId,name,desc,price,detail,imgs) => {
    return ajax('/manage/product/add', {categoryId,pCategoryId,name,desc,price,detail,imgs},"POST")
}
// ---- 添加商品
export const updateShops = (_id,categoryId,pCategoryId,name,desc,price,detail,imgs) => {
    return ajax('/manage/product/update', {_id,categoryId,pCategoryId,name,desc,price,detail,imgs},"POST")
}
// ---- 删除图片
export const removePic = (name) => {
    return ajax('/manage/img/delete', {name},"POST")
}
// ---- 添加角色
export const addPeople = (roleName) => {
    return ajax('/manage/role/add', {roleName},'POST')
}
// ---- 获取角色列表
export const getPeopleList = () => {
    return ajax('/manage/role/list')
}

