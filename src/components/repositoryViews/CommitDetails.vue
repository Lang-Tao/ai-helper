<template>
  <div class="commit-details">
    <h3>Commit {{ commit.hash }}</h3>
    <p>{{ commit.message }}</p>
    <pre>{{ commit.diff }}</pre>
  </div>
</template>

<script>
export default {
  name: "CommitDetails",
  data() {
    return {
      commit: {},
    };
  },
  created() {
    const { name, hash } = this.$route.params;
    // 这里调用 GitWeb 的 API 获取提交详细信息
    this.commit = {
      hash,
      message: "Add new feature",
      diff: "+ Added new feature code",
    };
  },
};
</script>

<style scoped>
pre {
  background: #f5f5f5;
  padding: 10px;
}
</style>
