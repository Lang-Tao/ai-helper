<template>
  <div class="container">
    <div class="select-box">
      <el-select v-if="projectList.length > 0" v-model="selectedProject" filterable placeholder="请选择">
        <el-option
          v-for="project in projectList"
          :key="project.address"
          :label="project.name"
          :value="project.name">
        </el-option>
      </el-select>
      
      <el-select v-model="selectedIssueType" style="margin-left: 20px">
        <el-option
          v-for="issueType in issueTypeList"
          :key="issueType.type"
          :label="issueType.type"
          :value="issueType.type">
        </el-option>
      </el-select>

      <el-cascader :options="options" v-model="selectedAssignee" placeholder="选择处理人" :show-all-levels="false" :props="cascaderProps" style="margin-left: 20px"></el-cascader>

      <el-input style="margin-left: 20px;width:200px" prefix-icon="el-icon-search" placeholder="搜索事项"></el-input>

    </div>

    <div style="width: 97%;height:100%;margin-top: 20px;display:flex;flex-direction: row;">
      <div class="box1">
        <span class="box-title">
          <i class="el-icon-document" style="margin-right: 10px"></i>
          待规划事项 Backlog
          <el-tag size="mini" style="border-radius:10px;background-color:#d54941;color: white;margin-left: 10px">10</el-tag>
        </span>
        <div class="create-box">
          <div>
            <span><i class="el-icon-chat-square" style="margin-right: 10px"></i>创建</span>
            <el-select size="mini" style="margin-left: 10px;width:100px"></el-select>
          </div>
          
          <el-input 
          class="borderless" 
          style="margin-top: 20px" 
          v-model="issueContent" 
          type="textarea" 
          autosize 
          :rows="1" 
          placeholder="请输入内容"></el-input>

        </div>
        <div class="issue-box">
          <div class="issue-item" v-for="item in 10" :key="item">
            <div class="issue-title">
              <i class="el-icon-chat-square" style="margin-right: 10px"></i>
              待规划事项{{item}}
            </div>
          </div>
        </div>
        
      </div>
      <div class="box2">
        <span class="box-title"><i class="el-icon-coordinate" style="margin-right: 10px"></i>迭代内已规划事项</span>

        <!-- 使用v-for展示多个 -->
        <div class="iteration-box">
          <span class="iteration-name" @click="showIteration"><i :class="arrowIcon" style="margin-right: 10px"></i>迭代名称example已规划事项 (4)</span>
          <span class="iteration-time">2024/08/10 迭代结束</span>
          <!-- 加入过渡动画 -->
          <transition name="slide">
            <div v-if="isIterationVisible" class="issue-box">
              <div class="issue-item" v-for="item in 4" :key="item">
                <div class="issue-title">
                  <i class="el-icon-chat-square" style="margin-right: 10px"></i>
                  待规划事项{{item}}
                </div>
              </div>
              <el-button type="text" style="margin:5px 0 0 -580px">+ 添加事项</el-button>
            </div>
          </transition>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import { getProjectList } from "@/api/project";

export default {
  name: "HomeTask",
  data() {
    return {
      arrowIcon: "el-icon-caret-bottom",
      issueContent: "",
      issueList: [{ name: 2321 }, { name: 2213321 }, { name: 232123231 }],
      isIterationVisible: true,
      projectList: [],
      selectedProject: "全部项目",
      issueTypeList: [
        { type: "全部事项" },
        { type: "用户故事" },
        { type: "任务" },
        { type: "缺陷" },
      ],
      selectedIssueType: "全部事项",
      options: [
        {
          name: "项目1",
          member: [
            {
              name: "张三",
              id: "1",
            },
            {
              name: "李四",
              id: "2",
            },
            {
              name: "王五",
              id: "3",
            },
          ],
        },
      ],
      cascaderProps: {
        value: "id",
        label: "name",
        children: "member",
      },
      selectedAssignee: "",
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    showIteration() {
      this.isIterationVisible = !this.isIterationVisible;
      this.arrowIcon = this.isIterationVisible
        ? "el-icon-caret-bottom"
        : "el-icon-caret-right";
    },
    getProjectList() {
      getProjectList()
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.projectList = [
              { name: "全部项目", address: "全部项目" },
            ].concat(res.data);
            this.selectedProject =
              this.projectList.length > 0 ? this.projectList[0].name : "";
          } else {
            console.error(res.message || "获取列表失败");
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
.container {
  width: 100%;
  height: max(100vh, 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
  background-image: url("@/assets/img/home_bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.select-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 97%;
  margin-top: 20px;
}
.select-box .el-select,
.el-input,
.el-cascader {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
}
.box1 {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 0;
}
.box2 {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-left: 20px;
  padding: 10px 0;
}
.box-title {
  font-size: 16px;
  margin: 20px 28px;
}
.create-box {
  width: 97%;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 10px 20px;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
}
.issue-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.issue-item {
  position: relative;
  width: 97%;
  padding: 16px;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 5px;
  border: 0.5px solid #d9d9d900;
}
.issue-item::before {
  content: " ";
  width: 675px;
  height: 0.5px;
  position: absolute;
  bottom: -0.5px;
  left: 20;
  background-color: #b4b4b484;
}
.issue-item:hover {
  background-color: #f0f0f079;
  border: 0.5px solid #d9d9d9;
  cursor: pointer;
}
.iteration-name {
  font-size: 24px;
  cursor: pointer;
}
.iteration-time {
  font-size: 14px;
  margin: 10px 0px 20px 30px;
  color: #6a6a6a;
}
.iteration-box {
  margin: 20px;
  display: flex;
  flex-direction: column;
}

/* 图标样式 */
.el-icon-caret-right,
.el-icon-caret-bottom {
  font-size: 16px;
}
.el-icon-caret-right:hover,
.el-icon-caret-bottom:hover {
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
}
.el-icon-chat-square {
  color: #2bb586;
  font-weight: 600;
}

/* 滑动动画效果 */
.slide-enter-active {
  transition: all 0.5s ease;
  overflow: hidden;
}
.slide-enter {
  height: 0;
  opacity: 0;
  padding: 10px 0;
}
.slide-enter-to {
  height: auto;
  opacity: 1;
  padding: 0px; /* 根据需求调整 */
}
</style>

<style>
.borderless .el-textarea__inner {
  border: none;
  padding: 0;
}
</style>