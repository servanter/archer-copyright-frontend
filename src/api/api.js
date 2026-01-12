import request from "./request";
export default {
    getTableData(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/227186642?apifoxApiId=227186642',
            method: 'get',
            data: params
        })
    },
    getCountData(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/227189002?apifoxApiId=227189002',
            method: 'get',
            data: params
        })
    },
    getMenuData(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/227490044',
            method: 'get',
            data: params
        })
    },
    getUserData(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/227568338?apifoxApiId=227568338',
            method: 'get',
            data: params
        })
    },
    addUserData(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/228015397?apifoxApiId=228015397',
            method: 'post',
            data: params
        })
    },
    editUserData(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/228015397?apifoxApiId=228015397',
            method: 'post',
            data: params
        })
    },
    deleteUserData(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/228015397?apifoxApiId=228015397',
            method: 'post',
            data: params
        })
    },
    login(params) {
        return request({
            url: 'https://apifoxmock.com/m2/5357828-5029552-default/227490044?apifoxApiId=227490044',
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
}