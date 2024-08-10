<template>
  <div class="home">
    <h1>Git Repositories</h1>
    <RepoList />
  </div>
</template>

<script>
import RepoList from "@/components/repositoryViews/RepoList.vue";

export default {
  name: "Home",
  components: {
    RepoList,
  },
};
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
