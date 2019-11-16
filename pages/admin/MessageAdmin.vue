<template>
    <!-- 获取所有的前端心得数据 -->
    <div class="admin-message">
      <!-- 搜索栏 -->
      <!-- element中的过滤方法 -->
       <el-table :data="tableData.filter(data => !search || data.nickname.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">

        <el-table-column
          label="昵称"
          prop="nickname">
        </el-table-column>

        <el-table-column
          label="内容"
          prop="content">
        </el-table-column>

        <el-table-column
          label="创建时间"
          prop="created_time">
        </el-table-column>

        <el-table-column
          align="right">

          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入昵称进行搜索"/>
          </template>

          <template slot-scope="scope">
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
    // 删除数据
    handleDelete(index, row) {

      const id = (index, row)._id

       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$axios.post('/api/deletemessageboard',{id: id})
            .then(res => {
            if(res.data.err_code === 0){
                this.getMessage()
              }
            })
            .catch(err => {
              console.log(err)
            })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    // 从后台得到数据
    getMessage() {
      this.$axios.get('/api/getmessageboard')
        .then(res => {
          this.tableData = res.data.data

          // 从后台获取到created_time之后进行时间的格式化
          this.tableData.forEach(i => {
            i.created_time = this.$options.filters['dateFormat'](i.created_time)
          })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getMessage()
  }

}
</script>

<style lang="less" scoped>
.admin-message {
  padding: 1%;
}

</style>