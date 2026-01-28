/**
 * 获取版权选项列表
 * @param {object} proxy - Vue组件实例的proxy对象
 * @param {number} pageSize - 每页大小，默认为1000
 * @returns {Promise<Array<{label: string, value: number|string}>>} 返回格式化后的选项列表
 */
export async function getCopyrightOptions(proxy, pageSize = 1000) {
    try {
        const { data } = await proxy.$api.queryCopyrightList({ pageSize })
        return data.list.map(x => ({ label: x.copyrightName, value: x.id }))
    } catch (error) {
        console.error('获取版权选项列表失败:', error)
        return []
    }
}

/**
 * 初始化版权选项到指定的ref对象
 * @param {import('vue').Ref} optionsRef - 存储选项的ref对象
 * @param {object} proxy - Vue组件实例的proxy对象
 * @param {number} pageSize - 每页大小，默认为1000
 * @returns {Promise<void>}
 */
export async function initCopyrightOptions(optionsRef, proxy, pageSize = 1000) {
    const options = await getCopyrightOptions(proxy, pageSize)
    optionsRef.value = options
}

/**
 * 获取类目树结构
 * @param {object} proxy - Vue组件实例的proxy对象
 * @returns {Promise<Array>} 返回类目树结构数据
 */
export async function getCategoryTree(proxy) {
    try {
        const { data: categories } = await proxy.$api.queryCategoryTree()
        return categories
    } catch (error) {
        console.error('获取类目树结构失败:', error)
        return []
    }
}

/**
 * 初始化类目树结构到指定的ref对象
 * @param {import('vue').Ref} optionsRef - 存储类目树结构的ref对象
 * @param {object} proxy - Vue组件实例的proxy对象
 * @returns {Promise<void>}
 */
export async function initCategoryTree(optionsRef, proxy) {
    const categories = await getCategoryTree(proxy)
    optionsRef.value = categories
}


/**
 * 获取渠道选项列表
 * @param {object} proxy - Vue组件实例的proxy对象
 * @param {number} pageSize - 每页大小，默认为1000
 * @returns {Promise<Array<{label: string, value: number|string}>>} 返回格式化后的选项列表
 */
export async function getChannelOptions(proxy, pageSize = 1000) {
    try {
        const { data } = await proxy.$api.queryChannelList({ pageSize })
        return data.list.map(x => ({ label: x.channelName, value: x.id }))
    } catch (error) {
        console.error('获取渠道选项列表失败:', error)
        return []
    }
}

/**
 * 初始化渠道选项到指定的ref对象
 * @param {import('vue').Ref} optionsRef - 存储选项的ref对象
 * @param {object} proxy - Vue组件实例的proxy对象
 * @param {number} pageSize - 每页大小，默认为1000
 * @returns {Promise<void>}
 */
export async function initChannelOptions(optionsRef, proxy, pageSize = 1000) {
    const options = await getChannelOptions(proxy, pageSize)
    optionsRef.value = options
}
