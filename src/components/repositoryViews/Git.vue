<template>
  <div style="margin: 0;">
    <div class="info-box">
        <div class="functions">
            <el-select v-model="branch" placeholder="请选择">
                <el-option
                v-for="item in branchList"
                :key="item.value"
                :value="item.value">
                    <i style="margin-right:10px" class="iconfont icon-code-branch"></i>
                    <span>{{ item.value }}</span>
                </el-option>
            </el-select>
        </div>
        <div class="info">

            <div class="avator-container">
                <img src='@/assets/img/defaultAvater.jpg' class="avator">
            </div>
            
            <div class="info-text">
                <span class="title">repository.commitMes</span>
                <span class="description">admin 提交于 time 前</span>
            </div>
        </div>
    </div>
    <div class="repository">
      <!-- 文件和文件夹展示 -->
      <el-table :data="files" :show-header="false" style="width: 100%; ">
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
      path: '',
      repository: {},
      branchList:[
            {
            value: 'Master'
            },
            {
            value: 'main'
            },
        ],
      branch:'Master',
    };
  },
  computed: {
    pathArray() {
      return this.path.split('/').filter(folder => folder);
    },
    canGoBack() {
      return this.pathArray.length > 0;
    }
  },
  methods: {
    async fetchRepoContents() {
      try {
        console.log("click file:" + this.path);
        const response = await fetch(`https://api.github.com/repos/lilishop/lilishop/contents/${this.path}`);
        let data = await response.json();
        this.files = this.sortFiles(data);
      } catch (error) {
        console.error('Failed to fetch repository contents:', error);
      }
    },
    sortFiles(files) {
      return files.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === 'dir' ? -1 : 1;
      });
    },
    openFolder(folderName) {
      this.path += `${folderName}/`;
      this.fetchRepoContents();
    },
    goBack() {
      if (this.canGoBack) {
        this.pathArray.pop();
        this.path = this.pathArray.join('/') + '/';
        this.fetchRepoContents();
      }
    },
    editFile(fileName) {
      this.$router.push({ name: 'code-editor', params: { filePath: this.path + fileName } });
    }
  },
  mounted() {
    this.fetchRepoContents();
  }
}
</script>

<style scoped lang="scss">
.el-icon-folder {
  color: #83cdff;
  margin-left:10px;
  margin-right: 8px;
}
.el-icon-document {
  color: #1f1f1f;
  margin-left:10px;
  margin-right: 8px;
}
.repository {
  width: 97%;
  margin:15px 25px;
  background-color: #ffffff;
  border: #b1b1b153 solid 0.5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.file-name:hover {
  color: #409EFF;
  cursor: pointer;
}
.info-box{
    width: 97%;
    height: 180px;
  margin:0px 25px 15px;
  background-color: #ffffff;
  border: #b1b1b153 solid 0.5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}
.fuctions{
    margin: 10px 0 0;
}
.el-select{
    height: 50%;
    width:150px;
    margin:10px 15px
}
.info{
    background-color: #f4f9ff;
    margin:0 15px 10px;
    height: 105px;
    border-radius: 5px;
    padding: 20px 30px;
    display: flex;
    align-content: center;
}
.avator-container{
    display: flex;
    align-items: center;
    justify-content: center;
}
.avator{
    width:40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    text-align: center;
}
.info-text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 30px;
}
.title{
    font-size: 16px;
}
.description{
    color:#1f1f1fac;
    font-weight: 500;
}
#code-editor-containr {
  .CodeMirror {
    overflow: hidden !important;
    height: auto !important;
  }
}

</style>