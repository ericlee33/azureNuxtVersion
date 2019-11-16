<template>
    <!-- 获取所有的前端心得数据 -->
    <div class="admin-ap">
      <!-- 搜索栏 -->
      <!-- element中的过滤方法 -->
       <el-table :data="tableData.filter(data => !search || data.account.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column
          label="帐号"
          prop="account">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="created_time">
        </el-table-column>
        <el-table-column
          label="帐号权限(0为只能评论,1为可以进入后台管理系统进行操作)"
          prop="status">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入帐号进行搜索"/>
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
      let status = (index, row).status
      if(status === 1) {
        status = 0
      }else {
        status = 1
      }
      this.$axios.post('/api/editaccount', { id:id, status: status })
        .then(res => {
          if(res.data.err_code === 0) {
            this.getAccount()
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleDelete(index, row) {
      const id = (index, row)._id

       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/deleteaccount',{id: id})
              .then(res => {
              if(res.data.err_code === 0){
                  this.getAccount()
                }
              })
              .catch(err => {
                console.log(err)
              })

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
    },

    getAccount() {
      this.$axios.post('/api/getaccount')
        .then(res => {
          this.tableData = res.data.data

          // console.log(this.tableData[0].created_time)

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
    this.getAccount()
  }

}
</script>

<style lang="less" scoped>
.admin-ap {
  padding: 1%;
}

</style>