<template>
  <div class="intelligence-check">

    <div class="select-box">

      <div>
        <el-select v-model="selectedProjectName" placeholder="请选择项目">
        <el-option v-for="project in projectList"
        :key="project.address"
        :value="project.name">
        </el-option>
        </el-select>

        <el-cascader style="margin-left: 20px; width:500px"
        v-model="selectedFile"
        :options="fileList"
        :props="cascaderProps"></el-cascader>
      </div>

      <div>
        <el-button type="primary" @click="review">审查</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>

    <div class="overview">
      <div class="code-view">
        <div v-if="fileContent.length === 0" class="empty-box">
            <span class="empty-text">请在上方选择审查文件</span>
        </div>
        <div v-else class="code-box">
          <pre>{{ fileContent }}</pre>

        </div>
      </div>

      <div class="comment">
        <el-input
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 20}"
        placeholder="请输入审查意见"
        v-model="comment"></el-input>
      </div>
    </div>
      
   
  </div>
</template>

<script>
import { getProjectList } from "@/api/project";
import { getProjectFileList } from "@/api/project";
import { getProjectFileContent } from "@/api/project";

export default {
  name: "personCheck",
  components: {},
  data() {
    return {
      comment: "",
      projectList: [],
      fileList: [],
      cascaderProps: {
        value: "name",
        label: "name",
        children: "children",
      },
      selectedFile: "",
      selectedProjectName: "",
      repository: {},
      fileContent: "",
    };
  },
  computed: {},
  methods: {
    // 获取文件列表
    getFileList() {
      getProjectFileList(this.selectedProjectRepo)
        .then((res) => {
          console.log(this.selectedProjectName + "文件列表：");
          console.log(res);
          if (res.code === 0) {
            this.fileList = this.removeEmptyChildren(res.data.fileList);
            console.log("修改后的数据");
            console.log(this.fileList);
          } else {
            console.error(res.message || "获取列表失败");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },

    // 处理返回数据格式
    removeEmptyChildren(data) {
      // 遍历每个对象
      return data.map((item) => {
        // 如果该对象有children，并且children不为空
        if (item.children && item.children.length > 0) {
          // 递归处理其子节点
          item.children = this.removeEmptyChildren(item.children);
        }
        // 如果children是空的，删除children属性
        if (item.children && item.children.length === 0) {
          delete item.children;
        }
        return item;
      });
    },

    // 获取项目列表
    getProjectList() {
      getProjectList()
        .then((res) => {
          console.log("项目列表：");
          console.log(res);

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

    // 审查代码
    review() {
      if (this.selectedFile.length !== 0) {
        console.log(
          "path:" +
            this.selectedFile.join("/") +
            "   address:" +
            this.selectedProjectAddress
        );

        // 调用获取文件内容接口
        getProjectFileContent(
          this.selectedFile.join("/"),
          this.selectedProjectAddress
        ).then((res) => {
          console.log("文件内容：");
          console.log(res);
          if (res.code === 0) {
            this.fileContent = res.data;
          } else {
            console.error(res.message || "获取文件内容失败");
          }
        });
      } else {
        this.$message.warning("请选择文件");
      }
    },

    // 提交代码审查意见
    submit() {
      // todo 调用提交评论接口
      // 此处为模拟数据
      this.comment = "";
      this.fileContent = "";
      this.$message.success("提交成功");
    },
  },
  mounted() {
    this.getProjectList();
    this.getFileList();
  },
  watch: {
    selectedProjectName(newVal) {
      // 根据项目名获取文件列表
      this.getFileList();
    },
  },
  computed: {
    selectedProjectRepo() {
      return this.projectList.find(
        (item) => item.name === this.selectedProjectName
      )?.repositoryId;
    },
    selectedProjectAddress() {
      return this.projectList.find(
        (item) => item.name === this.selectedProjectName
      )?.address;
    },
  },
};
</script>


<style scoped lang="scss">
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
  margin-top: 20px;
  height: 92%;
  background-color: #f0f0f07b;
  display: flex;
  flex-direction: column;
}
.code-view {
  min-height: 500px;
  display: flex;
  flex: 3;
  background-color: #fff;
  margin-bottom: 10px;
  border-bottom: 1px solid #cccccc64;
  border: 1px solid #cccccc64;
  border-radius: 5px;
}
.comment {
  display: flex;
  flex: 1;
  background-color: #fff;
  border: 1px solid #cccccc64;
  border-radius: 5px;
  padding: 10px;
}
.empty-box {
  padding: 250px 520px;
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

.el-icon-folder {
  color: #83cdff;
  margin-left: 10px;
  margin-right: 8px;
}
.el-icon-document {
  color: #1f1f1f;
  margin-left: 10px;
  margin-right: 8px;
}
.repository {
  width: 97%;

  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.file-name:hover {
  color: #409eff;
  cursor: pointer;
}

.code-box {
  padding: 10px;
}
</style>

<style>
.el-textarea__inner {
  border: none;
  font-size: 16px;
  line-height: 18px;
}
</style>




