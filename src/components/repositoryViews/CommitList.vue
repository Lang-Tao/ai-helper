<template>
  <div class="commit-list">
    <h3>Commit History</h3>
    <ul>
      <li v-for="commit in commits" :key="commit.hash">
        <router-link :to="{ name: 'CommitDetails', params: { name: repo, hash: commit.hash } }">
          {{ commit.message }} ({{ commit.hash }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CommitList",
  props: ["repo"],
  data() {
    return {
      commits: [],
    };
  },
  created() {
    // 这里调用 GitWeb 的 API 获取提交历史
    this.commits = [
      { hash: "a1b2c3d", message: "Initial commit" },
      { hash: "d4e5f6g", message: "Add new feature" },
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
