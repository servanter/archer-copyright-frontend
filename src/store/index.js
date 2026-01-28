import { createStore } from "vuex";
import Cookie from "js-cookie"
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        menu:localStorage.getItem('menu') ? JSON.parse(localStorage.getItem('menu')) : [],
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {

            if (val.name == 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                let index = state.tabsList.findIndex((item) => item.name === val.name)
                if (index == -1) {
                    state.tabsList.push(val)
                }

            }
        },

        setMenuData(state, val) {
            state.menu = val
            localStorage.setItem('menu', JSON.stringify(val))
        },

        initMenuData(state, router) {
            if(!state.menu || state.menu.length == 0) {
                return
            }
            console.log('初始化菜单->', state.menu, state.menu.length)
            const menuArray = []
            state.menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(m => {
                        let url = `../views/${m.url}.vue`
                        m.component = () => import(url)
                        return m
                    })
                    menuArray.push(...item.children)
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = () => import(url)
                    menuArray.push(item)
                }
            });

            menuArray.forEach(item => {
                router.addRoute('main', item)
            })
        },

        closeTab(state, val) {
            let index = state.tabsList.findIndex((item) => item.name === val.name)
            state.tabsList.splice(index, 1)
        },
        logout(state) {
            state.menu = []
            localStorage.removeItem('menu')
            state.token = ''
            localStorage.removeItem('token')
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        }
    },

})