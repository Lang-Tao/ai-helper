<template>
  <div style="margin:50px 100px; ">
    <div class="setting-box">
        <span>审查标准：</span>
        <div class="select-box">
            <el-radio v-model="standard" label="Google">Google 标准</el-radio>
            <el-radio v-model="standard" label="Ali">阿里云 Java 标准</el-radio>
            <el-radio v-model="standard" label="Tencent">腾讯开发 标准</el-radio>
            <el-radio v-model="standard" label="custom">自定义 标准</el-radio>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
    data() {
      return {
        standard: 'Google',
      };
    },
}
</script>

<style scoped>
.setting-box{
    display: flex;
    flex-direction: row;
    font-size:15px
}
.select-box{
    margin-top: 2px;
    display: flex;
    flex-direction: column;
}
.el-radio{
    margin:0 0 10px 10px;
}
</style>