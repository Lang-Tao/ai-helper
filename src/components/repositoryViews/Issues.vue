<template>
  <div class="issues-page">
    <el-table :data="issues" style="width: 100%">
      <el-table-column prop="title" label="问题标题" />
      <el-table-column prop="author" label="创建者" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="comments" label="评论数" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="viewIssue(scope.row)">查看</el-button>
          <el-button type="text" @click="closeIssue(scope.row)">{{ scope.row.status === 'open' ? '关闭' : '重新打开' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Issues',
  props: {
    repository: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      issues: [
        {
          id: 1,
          title: '登录页面bug',
          author: 'John Doe',
          status: 'open',
          comments: 10
        },
        {
          id: 2,
          title: '添加新功能请求',
          author: 'Jane Smith',
          status: 'closed',
          comments: 5
        },
        {
          id: 3,
          title: '性能优化建议',
          author: 'Bob Johnson',
          status: 'open',
          comments: 3
        }
      ]
    }
  },
  methods: {
    getStatusType(status) {
      return status === 'open' ? 'danger' : 'success'
    },
    viewIssue(issue) {
      console.log(`查看问题 ${issue.title}`)
    },
    closeIssue(issue) {
      console.log(`${issue.status === 'open' ? '关闭' : '重新打开'}问题 ${issue.title}`)
    }
  }
}
</script>

<style>
.issues-page {
  padding: 20px;
}
</style>