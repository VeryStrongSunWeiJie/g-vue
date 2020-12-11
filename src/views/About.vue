<template>
  <div class="about">
    <Search></Search>
    <el-col :span="6">
      <el-tree
        show-checkbox
        :data="childrens"
        accordion
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-col>

    <el-col :span="12" style="width: 70%">
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
      >
        <el-table-column label="编号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>分类: {{ scope.row.categoryId }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="是否上架"
          width="180"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.publishStatus == 1"
              type="danger"
              disable-transitions
            >
              未上架
            </el-tag>

            <el-tag v-else disable-transitions> 上架 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span v-if="scope.row.publishStatus == 1">
              <el-button size="mini" @click="Ontheshelf(scope.row.id)"
                >上架</el-button
              ></span
            >
            <span v-else
              ><el-button
                size="mini"
                type="warning"
                @click="Ontheshelf(scope.row.id)"
                >下架</el-button
              ></span
            >
            &nbsp;
            <el-button
              size="mini"
              type="danger"
              @click="deletePms(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>
<script>
import Search from "../views/search";
export default {
  name: "about",
  data() {
    return {
      data: "",
      childrens: [],
      defaultProps: {
        children: "pmsCategories",
        label: "name",
      },
      tableData: [{}],
      loading: true,
    };
  },
  components: {
    Search,
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    getMenu() {
      var _this = this;
      _this.$http
        .get("/api/demo/list", {
          params: {},
        })
        .then(function (data) {
          _this.childrens = data.data.data;
          _this.loading = false;
        });
    },
    //获取表格
    getTable() {
      var _this = this;
      _this.$http.get("/api/pmsSpu/list", {}).then(function (data) {
        _this.tableData = data.data.data;
      });
    },
    deletePms(id) {
      var _this = this;
      _this.$http.get("/api/pmsSpu/delete", { id: id }).then(function (data) {
        if ((data.data = "true")) {
          _this.$message({
            message: "删除成功",
            type: "warning",
          });
          _this.getTable();
        } else {
          alert("失败");
        }
      });
    },
    //商品上架
    Ontheshelf(id) {
      //axios修改上架
      var _this = this;
      _this.$http
        .get("/api/pmsSpu/update", {
          params: { id: id },
        })
        .then(function (data) {
          if ((data.data = "true")) {
            _this.$message("成功");
            _this.getTable();
          } else {
            alert("失败");
          }
        });
    },
  },
  created() {
    this.getMenu();
    this.getTable();
  },
};
</script>
