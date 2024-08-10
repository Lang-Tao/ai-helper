<template>
  <div class="file-browser">
    <h3>Files in {{ repo }}</h3>
    <ul>
      <li v-for="file in files" :key="file.path">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FileBrowser",
  props: ["repo"],
  data() {
    return {
      files: [],
    };
  },
  created() {
    // 这里调用 GitWeb 的 API 获取文件列表
    this.files = [
      { path: "src/main.js", name: "main.js" },
      { path: "src/App.vue", name: "App.vue" },
      // ... 你可以用 axios 来动态获取这个列表
    ];
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>
