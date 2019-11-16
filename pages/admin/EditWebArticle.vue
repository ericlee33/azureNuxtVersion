<template>
  <div class="edit-web-article-container">
    <div class="form-container">

      <div class="header">
        <span>请选择要添加的的文章类型: </span>
        <el-radio-group v-model="radio">
          <!-- 选择一个类型 -->
          <el-radio-button label="前端技术"></el-radio-button>
          <el-radio-button label="个人随笔"></el-radio-button>
        </el-radio-group>
      </div>

      <el-form label-width="120px" :model="formLabelAlign">
        <el-form-item label="文章类型" required >
          <el-input v-model="formLabelAlign.category" disabled></el-input>
        </el-form-item>
        <el-form-item label="文章标题" required>
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" required>
          <VueEditor style="width: 80%"
            v-model="formLabelAlign.content"
            useCustomImageHandler
            @image-added="handleImageAdded"></VueEditor>
          <!-- <el-input type="textarea" v-model="formLabelAlign.content" placeholder="来都来了,何不留个足迹呢~" :rows="18"></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendWebArticle">发表</el-button>
          <el-button type="primary" @click="backToWebAdmin">返回管理界面</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  // props: []
  data(){
    return{
      radio: '',
      formLabelAlign: {
        title: '',
        content: '',
        category: ''
      },
      id: this.$route.params.id
    }
  },
  methods: {
    getArticle() {
      console.log(this.id)
      this.$axios.get('/api/getblog/' + this.id)
        .then(res => {
          // 传递数据给我们的表单
          this.formLabelAlign = res.data.bloginfo[0]
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 发表web文章
    sendWebArticle(){
      // console.log(this.formLabelAlign)
      this.$axios.post('/api/updateblog/' + this.id,{
          title: this.formLabelAlign.title,
          content: this.formLabelAlign.content,
          category: this.formLabelAlign.category
        })
        .then(res => {
          if(res.data.err_code === 0){
            this.$message('发表成功!')
            this.$router.go(-1)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    backToWebAdmin() {
      this.$router.go(-1)
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);
      console.log(formData)
      this.$axios({
        url: "/api/upload",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getArticle()
  },
  watch: {
    radio: function(newval){
      this.formLabelAlign.category = newval
    }
  }
}

</script>
<style lang="less" scoped>
.edit-web-article-container {
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-container {
    width: 90%;

    .header {
      margin-left: 5%;
      margin-bottom: 2%;

      p {
        height: 25px;
        line-height: 25px;
      }
    }
  }
}
</style>