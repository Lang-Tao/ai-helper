<template>
  <div style="display:flex; justify-content:center">
    <div class="repository">
      <!-- 头部栏 -->
      <div class="header">
        <el-button icon="el-icon-arrow-left" @click="goBack" :disabled="!canGoBack">返回</el-button>
      </div>

      <!-- 文件和文件夹展示 -->
      <el-table :data="files" :show-header="false" style="width: 100%">
        <el-table-column label="">
          <template slot-scope="scope">
            <el-icon v-if="scope.row.type === 'dir'" class="el-icon-folder">
              <i class="el-icon-folder"></i>
            </el-icon>
            <el-icon v-if="scope.row.type === 'file'" class="el-icon-document">
              <i class="el-icon-document"></i>
            </el-icon>
            <span class="file-name" v-if="scope.row.type === 'dir'" @click="openFolder(scope.row.name)" style="cursor:pointer">{{ scope.row.name }}</span>
            <span class="file-name" v-if="scope.row.type === 'file'" @click="editFile(scope.row.name)" style="cursor:pointer">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      path: "",
    };
  },
  computed: {
    pathArray() {
      return this.path.split("/").filter((folder) => folder);
    },
    canGoBack() {
      return this.pathArray.length > 0;
    },
  },
  methods: {
    async fetchRepoContents() {
      try {
        console.log("click file:" + this.path);
        const response = await fetch(
          `https://api.github.com/repos/lilishop/lilishop/contents/${this.path}`
        );
        let data = await response.json();
        this.files = this.sortFiles(data);
      } catch (error) {
        console.error("Failed to fetch repository contents:", error);
      }
    },
    sortFiles(files) {
      return files.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === "dir" ? -1 : 1;
      });
    },
    openFolder(folderName) {
      this.path += `${folderName}/`;
      this.fetchRepoContents();
    },
    goBack() {
      if (this.canGoBack) {
        this.pathArray.pop();
        this.path = this.pathArray.join("/") + "/";
        this.fetchRepoContents();
      }
    },
    editFile(fileName) {
      this.$router.push({
        name: "code-editor",
        params: { filePath: this.path + fileName },
      });
    },
  },
  mounted() {
    this.fetchRepoContents();
  },
};
</script>

<style scoped lang="scss">
.el-icon-folder {
  color: #83cdff;
  margin-right: 5px;
}
.el-icon-document {
  color: #1f1f1f;
  margin-right: 5px;
}
.repository {
  width: 100%;
  margin: 20px;
  background-color: #ffffff;
  border: #b1b1b18f solid 0.5px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.file-name:hover {
  color: #409eff;
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
}
#code-editor-container {
  .CodeMirror {
    overflow: hidden !important;
    height: auto !important;
  }
}
</style>

