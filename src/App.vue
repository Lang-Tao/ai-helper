<!-- src/App.vue -->
<template>
  <div id="app">
    <loading :loading="isDelayedLoading" />
    <router-view/>
  </div>
</template>

<script>
import Loading from './components/others/Loading.vue'

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      isDelayedLoading: false,
      loadingTimer: null
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.startLoading();
      next();
    });

    this.$router.afterEach(() => {
      this.endLoading();
    });
  },
  methods: {
    startLoading() {
      this.isLoading = true;
      clearTimeout(this.loadingTimer);
      this.loadingTimer = setTimeout(() => {
        if (this.isLoading) {
          this.isDelayedLoading = true;
        }
      }, 300);  // 设置延时 300 毫秒
    },
    endLoading() {
      this.isLoading = false;
      clearTimeout(this.loadingTimer);
      this.isDelayedLoading = false;
    }
  }
}
</script>

<style>
</style>
