<template>
  <div style="margin:0 20px 20px;">
    <div slot="footer" class="editor-header">
      <span class="file-name">/{{filePath}}</span>
      <div>
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="saveFileContent">保存</el-button>
      </div>
    </div>
    <div id="code-editor-container">
      <codemirror v-model="fileContent" :options="editorOptions" />
    </div>
    
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';

require("codemirror/mode/clike/clike.js"); 

export default {
  components: {
    codemirror
  },
  props: ['filePath'],
  data() {
    return {
      isEditing: true,
      fileContent: '',
      editorOptions: {
        mode: 'text/x-java',
        lineNumbers: true,
        extraKeys: {
          Enter: "newlineAndIndentContinueMarkdownList"
        },
        lineWrapping: true, // 允许自动换行
      }
    };
  },
  methods: {
    async fetchFileContent() {
      try {
        const response = await fetch(`https://api.github.com/repos/lilishop/lilishop/contents/${this.filePath}`);
        const fileData = await response.json();
        const content = atob(fileData.content.replace(/\n/g, ''));
        this.fileContent = decodeURIComponent(escape(content)); // 确保UTF-8解码正确
      } catch (error) {
        console.error('加载文件内容失败:', error);
      }
    },
    saveFileContent() {
      console.log('Saving file content:', this.fileContent);
      this.isEditing = false;
      this.$router.go(-1);
    },
    cancelEdit(){
      this.isEditing = false;
      this.$router.go(-1);
    }
  },
  mounted() {
    this.fetchFileContent();
  }
};
</script>

<style lang="scss">
#code-editor-container {
  margin-bottom:10px;
  .CodeMirror {
    overflow: hidden !important;
    height: auto !important;
    border: 1px solid #ccc;
    font-size: 14px;
    line-height: 1.5;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace, 'Microsoft YaHei', '微软雅黑', '宋体';
  }
}

</style>

<style scoped>
.editor-header{
  margin-bottom: 10px;
  display: flex;
  justify-content:space-between;
}
.file-name{
  font-size: 16px;
  font-weight: bold;
  margin: 8px 5px 0 
}
</style>