<template>
  <div class="repo-list">
    <ul>
      <li v-for="repo in repos" :key="repo.name">
        <router-link :to="{ name: 'RepoDetails', params: { name: repo.name } }">{{ repo.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RepoList",
  data() {
    return {
      repos: [],
    };
  },
  created() {
    // 这里调用 GitWeb 的 API 获取仓库列表，使用 axios 或其他 HTTP 库
    this.repos = [
      { name: "example-repo-1" },
      { name: "example-repo-2" },
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
  margin: 10px 0;
}
</style>