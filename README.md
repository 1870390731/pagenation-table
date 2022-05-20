# pagenation-table
基于el-table的自带分页、自动排序、带参查询、可以自定义列的表格组件

安装  

```javascript
$ npm install pagenation-table --save-dev
```
引入  

```javascript
import ElementUI from 'element-ui'
import pagenationTable from 'pagenation-table'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.use(pagenationTable)
```
基本用法   

```javascript
<template>
    <pagenationTable :tableConf="tableConf"></pagenationTable>
</template>
<script>
export default {
    data() {
        return {
            tableConf: {
                url: "http://localhost:3000/api",
                thead: [
                    { type: "selection" },
                    { label: "序号", type: "index", width: 60 },
                    {
                        label: "属性a",
                        prop: "aaa"
                    }
                ],
            },
        };
    },
};
</script>
```
自定义列  

```javascript
<template>
    <pagenationTable :tableConf="tableConf">
        <template #slot_a="{row}">{{row.bbb}}</template>
    </pagenationTable>
</template>
<script>
export default {
    data() {
        return {
            tableConf: {
                url: "http://localhost:3000/api",
                thead: [
                    { type: "selection" },
                    { label: "序号", type: "index", width: 60 },
                    {
                        label: "属性a",
                        prop: "aaa",
                    },
                    {
                        label: "属性b",
                        slot: "slot_a",
                    },
                ],
            },
        };
    },
};
</script>
```
Props  

tableConf:  
|  字段名   | 说明  |  类型  |  默认值  |
|  ----  | ----  |  ----  | ----  |
| url  | 请求数据接口完整路径, 不传则不会调用接口 |  字符串  |  ''  |
| thead  | el-table-column Attributes都可以作为该对象的字段并传入组件中的el-table-column中 | 数组 |  []  |
| listKey  | 后台接口返回的表格数据字段名 | string |  'list'  |
| totalKey  | 后台接口返回的表格数据总数字段名 | string |  'totalCount'  |
| deleteEmptyKey  | 如果传true就会删掉请求参数中值为空字符、undefined、null的字段,传false就不删 | 布尔| true |
| ...  | el-table Attributes都可以作为tableConf的字段并传入组件中的el-table中 |

v-model: 勾选中的数据列表, 类型为数组  

searchFileds: 请求后台接口时附带的参数, 类型为对象  

pageConf: 设置el-pagenation分页组件, 有默认值(一般情况下不需要传这个参数)
|  字段名   | 说明  |  类型  |  默认值  |
|  ----  | ----  |  ----  | ----  |
| current  | 当前页 |  int  |  1  |
| limits  | 设置每页显示多少条数据 | 数组 | [10, 30, 50, 100, 200]  |
| limit  | 每页显示条数 |  int  |  10  |
| layout  | 分页布局 | 字符串| "sizes,total,prev,pager,next,jumper" | 
| total  | 总的数据条数 | int| 0 | 

Methods  

|  方法名   | 说明  |  参数   |
|  ----  | ----  |  ----  |
| getElTable  | 获取当前el-table实例, 可以通过返回值来调用el-table的所有方法 |  无  |
| getList  | 调用后台接口获取表格数据, 筛选数据时会用到这个方法, 返回一个promise, 可以拿到当前表格数据或空数组 |  search = false, 传true会将当前页数重置成第一页

