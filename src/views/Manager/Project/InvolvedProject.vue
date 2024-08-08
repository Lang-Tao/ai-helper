<template>
  <div class=''>
    <div style="display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start; height:300px; margin:20px 5px 0">
     
      <span class="title">常用项目</span>

      <el-card >
        <span style="font-size: 14px;  color: #657694; line-height: 24px;">暂无常用项目设置</span>
      </el-card>



    </div>

    



    <ProjectList v-if="tableData.length > 0" :table-data="tableData" />

    <el-empty v-else description="暂无项目"></el-empty>
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue';

export default {
  name: "",
  components: {ProjectList},
    data() {
      return {
          tableData: [{
            name: '项目1',
            address:'xiangmu1',
            admin: '管理员1',
            adminAvatar: '', 
            operation: '操作1'
          },],

      };
    },
  computed: {},
  watch: {},
  methods: {

  },
  created() {

  },
  mounted() {

  },
}
</script>

<style scoped>
.el-empty{
  margin-top: 150px;
}
.title{
  font-size: 18px;
  font-weight: 600;
  margin: 20px;

}
.el-card{
 
  display: flex;
  justify-content: center;
  align-content: center;
  width: 480px;
  height: 160px;
  background-color: #fff;
  margin: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}
</style>