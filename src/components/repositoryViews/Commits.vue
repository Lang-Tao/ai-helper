<template>
  <div class="commits-page">
    <el-timeline>
      <el-timeline-item v-for="commit in commits" :key="commit.id" :timestamp="commit.date">
        <h4>{{ commit.message }}</h4>
        <p>{{ commit.author }} - {{ commit.hash }}</p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'Commits',
  props: {
    repository: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commits: [
        {
          id: 1,
          hash: 'abcd1234',
          message: '修复bug',
          author: 'John Doe',
          date: '2023-08-01'
        },
        {
          id: 2,
          hash: 'efgh5678',
          message: '添加新功能',
          author: 'Jane Smith',
          date: '2023-08-02'
        },
        {
          id: 3,
          hash: 'ijkl9012',
          message: '重构代码',
          author: 'Bob Johnson',
          date: '2023-08-03'
        }
      ]
    }
  }
}
</script>

<style>
.commits-page {
  padding: 20px;
}
</style>