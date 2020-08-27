import pagenationTable from './src/pagenationTable.vue'
pagenationTable.install = function (Vue) {
    Vue.component(pagenationTable.name, pagenationTable)
}
export default pagenationTable