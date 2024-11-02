<template>
  <div style="margin:20px">
    <div class="title-box">
        <el-select v-modle="selectedProject"></el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTask",
  components: {},
    data() {
      return {
        projectList:[],
        selectedProject:{}
      };
    },
}
</script>

<style scoped>
.title-box{
    display: flex;
    flex-direction: row;
}
</style>