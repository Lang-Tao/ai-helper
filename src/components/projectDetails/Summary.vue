<template>
  <div class="intelligence-check">
    <div class="select-box">
      <el-button type="primary" @click="clickAiSummary">开始总结</el-button>
    </div>

    <div class="overview" v-loading="loading">

      <div v-if="AIsummary.length > 0" class="result">
        <vue-markdown :source="AIsummary" v-highlight>
          </vue-markdown>
      </div>

      <el-main v-else class="intro-main">
      <span>欢迎使用项目总结</span>
      <span class="intro-text"
        >解析项目的结构和文本内容（包含代码、注释、文档），并其做归纳总结生成项目摘要，<br>包含：项目功能、模块描述、模块关系等信息。</span
      >
    </el-main>
    </div>
  </div>
</template>


<script>
import { aiSummary } from "@/api/bot";

export default {
  name: "Intelligence",
  data() {
    return {
      projectList: [],
      selectedProjectName: "",
      AIsummary: "",
      loading: false, // 添加loading状态
    };
  },
  methods: {
    clickAiSummary() {
      this.loading = true; // 开始加载
      // 调用ai总结接口
      aiSummary("test2").then((res) => {
        console.log(res);
        this.loading = false; // 结束加载

        this.AIsummary = res.data;
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
.intro-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 30px;
  color: #373737;
}
.intro-text {
  font-size: 14px;
  color: #999999;
  margin-top: 20px;
  text-align: center;
  line-height: 28px;
}
</style>

