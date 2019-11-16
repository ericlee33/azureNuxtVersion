<template>
  <div class="register-container">

    <el-button type="primary" @click="dialogFormVisible = true" size="mini">注册</el-button>

    <el-dialog title="注册" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false" center width="50%">
      
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="68px" class="demo-ruleForm">
        
        <el-form-item label="帐号" prop="account">
          <el-input v-model.number="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormRegister">确 定</el-button>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('帐号不能为空'));
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      // 表单默认隐藏
      dialogFormVisible: false,

      ruleForm: {
        account: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitFormRegister() {
      let user = {
        account: this.ruleForm.account,
        password: this.ruleForm.pass,
        status: 0
      }
      user = JSON.stringify(user)
      // 向注册接口发送请求
      this.$axios.post('/api/register',{
        account: this.ruleForm.account,
        password: this.ruleForm.pass
      })
        .then(res => {
          if(res.data.err_code === 0) {
            this.$message('注册成功!')
            // 清空输入的内容
            window.localStorage.setItem('user', user)

            this.ruleForm.account = ''
            this.ruleForm.pass = ''
            this.ruleForm.checkPass = ''
            
            this.$store.commit('login')
            this.dialogFormVisible = false
           }
           if(res.data.err_code === 1) {
             this.$message('帐号已存在!')
             this.ruleForm.account = ''
             this.ruleForm.pass = ''
             this.ruleForm.checkPass = ''
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

 