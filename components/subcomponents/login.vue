<template>
  <div class="login-container">

    <el-button type="primary" @click="dialogFormVisible = true" size="mini" plain>Login</el-button>

    <el-dialog title="Login" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false" center width="40%">
      
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        
        <el-form-item label="Account" prop="account">
          <el-input v-model.number="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input type="Password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormLogin">确 定</el-button>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Name不能为空'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入Password'))
      }
    }
    return {
      // 表单
      dialogFormVisible: false,
      formLabelWidth: '120px',


      ruleForm: {
        account: '',
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitFormLogin() {
      let user = {
        account: this.ruleForm.account,
        password: this.ruleForm.pass
      }
      
      // 请求登录接口
      this.$axios.post('/api/login',{
        account: this.ruleForm.account,
        password: this.ruleForm.pass
      })
        .then(res => {
          if(res.data.err_code === 0) {
            this.$message('登录成功!')
            // 清空输入内容
            this.ruleForm.account = ''
            this.ruleForm.pass = ''

            user.status = res.data.user.status
            user = JSON.stringify(user)
            window.localStorage.setItem('user', user)

            this.$store.commit('login')
            this.dialogFormVisible = false
          }
          else if(res.data.err_code === 1) {
            this.$message('帐号或密码不存在')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

 