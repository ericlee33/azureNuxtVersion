<template>
    <!-- 获取所有的前端心得数据 -->
    <div class="admin-web">
      <!-- 添加按钮 -->
      <el-button type="primary" @click="goAddArticle">添加心得</el-button>
      <!-- 搜索栏 -->
      <!-- element中的过滤方法 -->
       <el-table :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">

        <el-table-column
          label="文章标题"
          prop="title">
        </el-table-column>

        <el-table-column
          label="创建时间"
          prop="created_time">
        </el-table-column>

        <el-table-column
          label="文章类别"
          prop="category">
        </el-table-column>

        <el-table-column
          align="right">

          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入文章标题的关键字进行搜索"/>
          </template>

          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // element提供的查找模块变量search
      search: '',
      // axios请求到的文章数据
      tableData: []
    }
  },
  methods: {
    handleEdit(index, row) {
      const id = (index, row)._id
      this.$router.push({ name: "editwebarticle", params: { id } })
    },
    handleDelete(index, row) {
      const id = (index, row)._id

      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$axios.post('/api/deleteblog',{id: id})
            .then(res => {
            if(res.data.err_code === 0){
                this.$message('删除成功!')
                this.getArticle()
              }
            })
            .catch(err => {
              console.log(err)
            })
            
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    getArticle() {
      this.$axios.post('/api/getblog')
        .then(res => {
          this.tableData = res.data.blogs

          // console.log(this.tableData[0].created_time)

          // 从后台获取到created_time之后进行时间的格式化
          this.tableData.forEach(i => {
            i.created_time = this.$options.filters['dateFormat'](i.created_time)
          })
      })
      .catch(err => {
        console.log(err)
      })
    },
    goAddArticle() {
      this.$router.push({ name: "addwebarticle", params: {} })
    }
  },
  created() {
    this.getArticle()
  }

}
</script>

<style lang="less" scoped>
.admin-web {
  padding: 1%;
}

</style>