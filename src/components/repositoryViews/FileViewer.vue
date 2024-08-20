<template>
  <div>
    <el-card v-if="file" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ file.name }}</span>
      </div>
      <pre>{{ fileContent }}</pre>
    </el-card>
    <div v-else>
      <el-empty description="请选择一个文件"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      fileContent: ''
    };
  },
  watch: {
    file: {
      immediate: true,
      handler(newFile) {
        if (newFile && newFile.type === 'file') {
          this.loadFileContent(newFile);
        } else {
          this.fileContent = '';
        }
      }
    }
  },
  methods: {
    loadFileContent(file) {
      // 模拟加载文件内容
      this.fileContent = `这是 ${file.name} 的内容...`;
    }
  }
};
</script>
