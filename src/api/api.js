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
}