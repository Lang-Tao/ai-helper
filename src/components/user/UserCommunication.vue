<template>
  <div style="padding:28px 25px">
    <div>
        <div class="receiver">
          <span>接收人：</span>
          <el-cascader :options="options" :show-all-levels="false" :props="cascaderProps"></el-cascader>

          <span style="margin:0 30px 0 210px">截止日期:</span>
          <el-date-picker
            v-model="deadline"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <div class="title-box">
          <span>事项标题：</span>
          <el-input class="title-input" v-model="title" placeholder="请输入标题"></el-input>
        </div>

        <div class="content-box">
          <span>事项内容：</span>
          <el-input
            class="content-input"
            type="textarea"
            :rows="25"
            resize="none"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
        </div>

        <el-button class="submit-btn" @click="sendTask">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      title: '',
      content: '',
      deadline:'',
      options:[
        {
        name:'项目1',
        member:[
          {
            name:'张三',
            id:'1'
          },
          {
            name:'李四',
            id:'2'
          },
          {
            name:'王五',
            id:'3'
          }
        ]
      }],
      cascaderProps: {
        value: 'id',
        label: 'name',
        children: 'member'
      },
    }
  },
  methods: {
    sendTask(){
      // todo 发送任务到指定用户的taskList

      console.log(this.deadline);
      

      this.$message({
        message: '发送成功',
        type: 'success'
      })
      this.title = ''
      this.content = ''
    }
  }
};
</script>

<style scoped>
.receiver{
  margin-left: 10px;
}
.el-cascader{
  margin-left: 33px;
}
.title-box{
  display: flex;
  margin: 20px 0 0 10px;
}
span{
  font-size: 18px;
  margin-top: 5px;
}
.title-input{
  width: 1200px;
  margin-left: 15px;
}
.content-box{
  margin: 20px 0 0 10px;
  display: flex;
}
.content-input{
  width: 1200px;
  margin-left: 15px;
}
.submit-btn{
  margin:20px 0 0 115px;
}
</style>
