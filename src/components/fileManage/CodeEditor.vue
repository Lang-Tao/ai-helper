<template>
  <div style="margin: 5px;">
    <div id="code-editor-container">
      <codemirror v-model="fileContent" :options="editorOptions" />
    </div>
    <div slot="footer" class="editor-footer">
      <el-button @click="cancelEdit">取消</el-button>
      <el-button type="primary" @click="saveFileContent">保存</el-button>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

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
        mode: 'java',
        lineNumbers: true
      }
    };
  },
  methods: {
    async fetchFileContent() {
      try {
        const response = await fetch(`https://api.github.com/repos/lilishop/lilishop/contents/${this.filePath}`);
        const fileData = await response.json();
        const content = atob(fileData.content.replace(/\n/g, ''));
        this.fileContent = content;
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
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  }
}
.editor-footer{
  display: flex;
  justify-content: flex-end;
}
</style>
