<template>
  <div class="repo-details">
    <h2>{{ repoName }}</h2>
    <CommitList :repo="repoName" />
    <FileBrowser :repo="repoName" />
  </div>
</template>

<script>
import CommitList from "@/components/repositoryViews/CommitList.vue";
import FileBrowser from "@/components/repositoryViews/FileBrowser.vue";

export default {
  name: "RepoDetails",
  components: {
    CommitList,
    FileBrowser,
  },
  computed: {
    repoName() {
      return this.$route.params.name;
    },
  },
};
</script>

<style scoped>
h2 {
  color: #666;
}
</style>
