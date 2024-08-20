<template>
  <div class="repository-view">
    <el-row :gutter="20">
      <el-col :span="8">
        <file-list :files="files" @file-selected="handleFileSelected"></file-list>
      </el-col>
      <el-col :span="16">
        <file-viewer :file="selectedFile"></file-viewer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileList from '@/components/repositoryViews/FileList.vue';
import FileViewer from '@/components/repositoryViews/FileViewer.vue';

export default {
  components: {
    FileList,
    FileViewer
  },
  data() {
    return {
      files: [
        { name: 'src', type: 'folder' },
        { name: 'README.md', type: 'file' },
        { name: 'package.json', type: 'file' },
        { name: 'index.html', type: 'file' }
      ],
      selectedFile: null
    };
  },
  methods: {
    handleFileSelected(file) {
      this.selectedFile = file;
    }
  }
};
</script>

<style scoped>
.repository-view {
  padding: 20px;
}
</style>
