// 文档参照 https://vuex.vuejs.org/zh/guide/modules.html
const state = {
    demoValue: 'demo value'
}
const mutations = {
    CHANGE_VALUE: (state, value) =>
        state.demoValue = value
}
const actions = {
    changeValue: ({ commit }, value) => {
        // 异步操作,模拟后台请求
        return new Promise(resolve => {
            setTimeout(() => {
                commit('CHANGE_VALUE', value)
                resolve()
            }, 1000)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}