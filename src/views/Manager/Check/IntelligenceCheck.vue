<template>
  <div class="intelligence-check">
    <div class="select-box">
      <el-select v-model="selectedProjectName" placeholder="请选择项目">
        <el-option v-for="project in projectList"
                   :key="project.address"
                   :value="project.name">
        </el-option>
      </el-select>
      <el-button type="primary" @click="AIcheck">智能审查</el-button>
    </div>

    <div class="overview" v-loading="loading">
      <span class="title">审查结果</span>

      <div v-if="AIcomment.length > 0" class="result">
        <vue-markdown :source="AIcomment" v-highlight>
          </vue-markdown>
      </div>

      <div v-else class="empty-box">
        <span class="empty-text">请在上方选择审查项目</span>
      </div>
    </div>
  </div>
</template>


<script>
import { getProjectList } from "@/api/project";
import { aiCheck } from "@/api/bot";

export default {
  name: "Intelligence",
  data() {
    return {
      projectList: [],
      selectedProjectName: "",
      AIcomment: "",
      loading: false, // 添加loading状态
    };
  },
  mounted() {
    this.getProjectList();
  },
  computed: {
    selectedProject() {
      return (
        this.projectList.find(
          (project) => project.name === this.selectedProjectName
        ) || {}
      );
    },
  },
  methods: {
    // 获取项目列表
    getProjectList() {
      getProjectList()
        .then((res) => {
          if (res.code === 0) {
            this.projectList = res.data;
            this.selectedProjectName =
              this.projectList.length > 0 ? this.projectList[0].name : "";
          } else {
            console.error(res.message || "获取列表失败");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },

    // ai审查
    AIcheck() {
      if (!this.selectedProjectName) {
        this.$message.error("请选择一个项目进行审查");
        return;
      }

      console.log("审查项目仓库地址：" + this.selectedProject.repositoryId);

      this.loading = true; // 开启加载状态

      // 调用接口
      aiCheck(this.selectedProject.repositoryId)
        .then((res) => {
          console.log(res);

          this.loading = false; // 关闭加载状态
          if (res.code === 0) {
            this.AIcomment = res.data;
          } else {
            this.$message.error(res.message || "审查失败");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },
  },
};
</script>


<style scoped>
.intelligence-check {
  padding: 24px;
  background-color: #f0f0f07b;
}
.select-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.overview {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  min-height: 80vh;
  background-color: #fff;
  border: 1px solid #cccccc64;
  border-radius: 5px;
}
.title {
  font-size: 16px;
  margin: 20px;
}
.empty-box {
  padding: 270px 520px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.empty-text {
  font-size: 30px;
  text-align: center;
  color: #37373774;
}
.result {
  margin: 20px;
}
</style>

