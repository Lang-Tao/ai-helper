<template>
  <div>
    <el-container>

      <el-container>

        <!--        内容区域-->
        <el-main
          style="
            padding: 100px;
            background-color: #f0f2f5;
            display: flex;
            flex-direction: column;
          ">
          <div style="margin-bottom: 50px">
            <span>更适合研发团队的项目管<br />理工具</span>
          </div>

          <el-tabs :tab-position="left" style="height: 200px">
            <el-tab-pane label="代办规划"></el-tab-pane>
            <el-tab-pane label="代办规划"
              >支持版本关联迭代，自动同步发布范围，版本进度好掌控</el-tab-pane
            >
            <el-tab-pane label="代办规划"></el-tab-pane>
            <el-tab-pane label="代办规划"></el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<
<script>
  import axios from "axios";

  export default {
    name: "manager",
    data() {
      return {
        isCollapsed: false,
        asideWidth: "200px",
        collapseIcon: "el-icon-s-fold",
        users: [],
      };
    },
    mounted() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.users = res.data;
      });
    },
    methods: {
     
    },
  };
</script>

<style scoped></style>