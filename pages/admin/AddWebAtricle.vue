<template>
  <div class="add-web-article-container">

    <div class="form-container">

      <div class="header">
        <p>请选择要添加的的文章类型:</p>
        <el-radio-group v-model="radio">
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
          <!-- <el-input type="textarea" v-model="formLabelAlign.content" placeholder="来都来了,何不留个足迹呢~" :rows="18"></el-input> -->
          <VueEditor style="width: 80%"
            v-model="formLabelAlign.content"
            useCustomImageHandler
            @image-added="handleImageAdded"></VueEditor>
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
  data(){
    return{
      radio: '',
      formLabelAlign: {
        category: '',
        title: '',
        content: '',
        // customToolbar: [
        //   ['bold', 'italic', 'underline'],
        //   [{'align':''},{'align':'center'},{'align':'right'}],
        //   [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        //   [{'background':[]},{'color':[]}],
        //   ['image','link'],
        //   ['strike'],
        //   ['clean'],
        // ]
      }
    }
  },
  methods: {
    // 发表web文章
    sendWebArticle(){
      // console.log(this.formLabelAlign)
      this.$axios.post('/api/addblog',{
          title: this.formLabelAlign.title,
          content: this.formLabelAlign.content,
          category: this.formLabelAlign.category
        })
        .then(res => {
          if(res.data.err_code === 0){
            this.$message('发表成功!')
            this.formLabelAlign.title = ''
            this.formLabelAlign.content = ''
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
  watch: {
    radio: function(newval){
      this.formLabelAlign.category = newval
    }
  }
}

</script>
<style lang="less" scoped>
.add-web-article-container {
  // height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;

  .form-container {
    width: 90%;

    .header {
      margin-left: 10%;
      margin-bottom: 2%;

      p {
        height: 25px;
        line-height: 25px;
      }
    }
  }
}
</style>