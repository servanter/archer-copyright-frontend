import request from "./request";
export default {
       login(params) {
        return request({
            url: 'http://localhost:8080/api/login/login',
            method: 'post',
            data: params
        })
    },
    queryRoleList(params) {
        return request({
            url: 'http://localhost:8080/api/role/list',
            method: 'get',
            data: params
        })
    },
    removeRole(params) {
        return request({
            url: 'http://localhost:8080/api/role/remove',
            method: 'get',
            data: params
        })
    },
    addRole(params) {
        return request({
            url: 'http://localhost:8080/api/role/add',
            method: 'post',
            data: params
        })
    },
    modifyRole(params) {
        return request({
            url: 'http://localhost:8080/api/role/modify',
            method: 'post',
            data: params
        })
    },
    queryMenuList(params) {
        return request({
            url: 'http://localhost:8080/api/menu/list',
            method: 'get',
            data: params
        })
    },
    removeMenu(params) {
        return request({
            url: 'http://localhost:8080/api/menu/remove',
            method: 'get',
            data: params
        })
    },
    addMenu(params) {
        return request({
            url: 'http://localhost:8080/api/menu/add',
            method: 'post',
            data: params
        })
    },
    modifyMenu(params) {
        return request({
            url: 'http://localhost:8080/api/menu/modify',
            method: 'post',
            data: params
        })
    },
    queryRoleMenuList(params) {
        return request({
            url: 'http://localhost:8080/api/menu/role',
            method: 'get',
            data: params
        })
    },
    addRoleMenuList(params) {
        return request({
            url: 'http://localhost:8080/api/menu/setting',
            method: 'post',
            data: params
        })
    },
    queryUserList(params) {
        return request({
            url: 'http://localhost:8080/api/user/list',
            method: 'get',
            data: params
        })
    },
    removeUser(params) {
        return request({
            url: 'http://localhost:8080/api/user/remove',
            method: 'get',
            data: params
        })
    },
    addUser(params) {
        return request({
            url: 'http://localhost:8080/api/user/add',
            method: 'post',
            data: params
        })
    },
    modifyUser(params) {
        return request({
            url: 'http://localhost:8080/api/user/modify',
            method: 'post',
            data: params
        })
    },
    queryUserRoleList(params) {
        return request({
            url: 'http://localhost:8080/api/role/user',
            method: 'get',
            data: params
        })
    },
    addUserRoleList(params) {
        return request({
            url: 'http://localhost:8080/api/role/setting',
            method: 'post',
            data: params
        })
    },
 
    queryCopyrightList(params) {
        return request({
            url: 'http://localhost:8080/api/copyright/list',
            method: 'get',
            data: params
        })
    },
    removeCopyright(params) {
        return request({
            url: 'http://localhost:8080/api/copyright/remove',
            method: 'get',
            data: params
        })
    },
    addCopyright(params) {
        return request({
            url: 'http://localhost:8080/api/copyright/add',
            method: 'post',
            data: params
        })
    },
    modifyCopyright(params) {
        return request({
            url: 'http://localhost:8080/api/copyright/modify',
            method: 'post',
            data: params
        })
    },
    
    queryCategoryList(params) {
        return request({
            url: 'http://localhost:8080/api/category/list',
            method: 'get',
            data: params
        })
    },
    queryChildrenList(params) {
        return request({
            url: 'http://localhost:8080/api/category/children',
            method: 'get',
            data: params
        })
    },
    removeCategory(params) {
        return request({
            url: 'http://localhost:8080/api/category/remove',
            method: 'get',
            data: params
        })
    },
     queryCategoryTree() {
        return request({
            url: 'http://localhost:8080/api/category/tree',
            method: 'get'
        })
    },
    addCategory(params) {
        return request({
            url: 'http://localhost:8080/api/category/add',
            method: 'post',
            data: params
        })
    },
    modifyCategory(params) {
        return request({
            url: 'http://localhost:8080/api/category/modify',
            method: 'post',
            data: params
        })
    },


        
    queryProductList(params) {
        return request({
            url: 'http://localhost:8080/api/product/list',
            method: 'get',
            data: params
        })
    },
    removeProduct(params) {
        return request({
            url: 'http://localhost:8080/api/product/remove',
            method: 'get',
            data: params
        })
    },
    modifyStatusProduct(params) {
        return request({
            url: 'http://localhost:8080/api/product/modifyStatus',
            method: 'get',
            data: params
        })
    },
    addProduct(params) {
        return request({
            url: 'http://localhost:8080/api/product/add',
            method: 'post',
            data: params
        })
    },
    modifyProduct(params) {
        return request({
            url: 'http://localhost:8080/api/product/modify',
            method: 'post',
            data: params
        })
    },

    queryProductPicList(params) {
        return request({
            url: 'http://localhost:8080/api/product/pic/list',
            method: 'get',
            data: params
        })
    },

    queryChannelList(params) {
        return request({
            url: 'http://localhost:8080/api/channel/list',
            method: 'get',
            data: params
        })
    },


      getSpecAndStock(productId) {
        return request({
            url: `http://localhost:8080/api/product/getSpecAndStock?productId=${productId}`,
            method: 'get',
        })
    },
    saveProductSpec(params) {
        return request({
            url: 'http://localhost:8080/api/product/settingStock',
            method: 'post',
            data: params
        })
    },

    // 查询商品渠道配置列表
    queryProductChannelConfigList(productId) {
        return request({
            url: `http://localhost:8080/api/product/channel/config/list?productId=${productId}`,
            method: 'get',
        })
    },

    // 查询商品SKU列表
    queryProductSkuList(productId, channelId) {
        return request({
            url: `http://localhost:8080/api/product/sku/list?productId=${productId}&channelId=${channelId}`,
            method: 'get',
        })
    },

    // 保存渠道配置（外层）
    saveChannelConfig(params) {
        return request({
            url: 'http://localhost:8080/api/product/channel/config/save',
            method: 'post',
            data: params
        })
    },

    // 保存渠道SKU库存锁定（里层）
    saveChannelSkuLock(params) {
        return request({
            url: 'http://localhost:8080/api/product/channel/sku/lock/save',
            method: 'post',
            data: params
        })
    },
}