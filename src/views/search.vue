<template>
  <div id="search">
    <el-autocomplete 
      class="inline-input" id="formInlineuser"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入查询内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
       restaurants: [],
       childrens: [],
       state1:'',
    };
  },
  methods: {
   querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
       createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll(sr,callback) {
        var _this=this;
          _this.$http.get("/api/pmsSpu/list", {params: {},}).then(function (data) {
             callback(data.data.data)
          });
      },
       handleSelect(item) {
        console.log(item);
      }
  },
   mounted() {
    this.loadAll('',data=>{
      let arr2 = Array.from(data);
      this.restaurants=arr2;
    });
  }
};
</script>

<style>
#search {
  margin: 8px auto;
  text-align: center;
}
#formInlineuser{
    width: 550px;
}
</style>