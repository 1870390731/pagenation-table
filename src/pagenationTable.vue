<template>
    <div class="pagenationTable">
        <el-table
            v-bind="tableConf"
            :data="tableConf.tableData || tableData"
            style="width: 100%;"
            :row-key="tableConf.row_key || 'id'"
            @selection-change="selectionChange"
            @sort-change="sortChange"
        >
            <template v-for="(item, index) in tableConf.thead">
                <el-table-column v-if="item.slot" :key="index" v-bind="item">
                    <template slot-scope="{row}">
                        <slot :name="item.slot" :row="row"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-else :key="index" v-bind="item"></el-table-column>
            </template>
        </el-table>
        <el-pagination
            background
            :small="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="page.limits"
            :page-size="page.limit"
            :layout="page.layout"
            :total="page.total"
            v-if="tableConf.hidePage !== true"
        ></el-pagination>
    </div>
</template>

<script>
import axios from "axios";
import { deleteEmptyKey } from "./utils";
export default {
    name: "pagenationTable",
    props: {
        tableConf: {
            type: Object,
            required: true,
            default() {
                return {
                    url: "", // 列表接口
                    thead: [
                        //el-table-column的属性都可以传
                        {},
                    ],
                };
            },
        },
        searchFileds: {
            // 搜索条件
            type: Object,
            default() {
                return {};
            },
        },
        pageConf: Object,
    },
    data() {
        return {
            tableData: [],
            page: {
                current: 1,
                limits: [10, 30, 50, 100, 200],
                limit: 10,
                layout: "sizes,total,prev,pager,next,jumper",
                total: 0,
            },
        };
    },
    created() {
        if (this.pageConf) {
            this.page = this.pageConf;
        }
        this.getList();
    },
    mounted() {},
    methods: {
        returnTableData() {
            return this.tableData;
        },
        sortChange({ prop, order }) {
            if (order) {
                this.page.prop = prop;
                this.page.order = order.replace("ending", "");
            } else {
                this.page.prop = "";
                this.page.order = "";
            }
            this.getList();
        },
        handleCurrentChange(val) {
            this.page.current = val;
            this.getList();
        },
        handleSizeChange(val) {
            this.page.limit = val;
            this.getList();
        },
        selectionChange(arr) {
            this.$emit("input", arr);
        },
        getList(search = false) {
            if (!this.tableConf.url || this.tableConf.tableData) return;
            if (search) {
                this.page.current = 1;
            }
            let params = {};
            if (this.tableConf.hidePage) {
                params = JSON.parse(JSON.stringify(this.searchFileds));
            } else {
                params = {
                    page: this.page.current,
                    rows: this.page.limit,
                    dir: this.page.order,
                    sort: this.page.prop,
                    ...JSON.parse(JSON.stringify(this.searchFileds)),
                };
            }
            let method = this.tableConf.method || "get";
            method = method.toLowerCase();
            let config;
            if (method == "get") {
                config = {
                    params,
                };
            } else {
                config = params;
            }
            let request = this.$http ? this.$http : axios;
            if (this.tableConf.deleteEmptyKey !== false) {
                config = deleteEmptyKey(config);
            }
            return request[method](this.tableConf.url, config)
                .then((res) => {
                    this.tableData =
                        res.data.data[this.tableConf.listKey || "list"];
                    this.page.total =
                        res.data.data[this.tableConf.totalKey || "totalCount"];
                    return this.tableData;
                })
                .catch((e) => {
                    this.tableData = [];
                    this.page.total = 0;
                    return [];
                });
        },
    },
};
</script>


<style lang="scss" scoped>
::v-deep .el-pagination {
    margin-top: 15px;
    padding: 10px;
}

::v-deep .el-pagination__sizes {
    position: relative;
    top: -2px;
}

::v-deep .el-table {
    thead th {
        background: #f5f5f5;
    }
    td,
    th {
        padding: 6px 0;
    }
}
::v-deep .el-table--border {
    border-right: 1px solid #ebeef5;
}
</style>