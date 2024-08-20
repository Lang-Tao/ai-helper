<template>
  <div class="merge-requests-page">
    <el-table :data="mergeRequests" style="width: 100%">
      <el-table-column prop="title" label="合并请求标题" />
      <el-table-column prop="source" label="源分支" />
      <el-table-column prop="target" label="目标分支" />
      <el-table-column prop="author" label="创建者" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="viewMergeRequest(scope.row)">查看</el-button>
          <el-button type="text" @click="approveMergeRequest(scope.row)">{{ scope.row.status === 'open' ? '批准' : '撤销' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MergeRequests',
  props: {
    repository: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mergeRequests: [
        {
          id: 1,
          title: '添加新功能',
          source: 'feature/login',
          target: 'develop',
          author: 'John Doe',
          status: 'open'
        },
        {
          id: 2,
          title: '修复bug',
          source: 'bugfix/login',
          target: 'master',
          author: 'Jane Smith',
          status: 'merged'
        },
        {
          id: 3,
          title: '性能优化',
          source: 'feature/performance',
          target: 'develop',
          author: 'Bob Johnson',
          status: 'open'
        }
      ]
    }
  },
  methods: {
    getStatusType(status) {
      switch (status) {
        case 'open':
          return 'warning'
        case 'merged':
          return 'success'
        case 'closed':
          return 'danger'
        default:
          return 'info'
      }
    },
    viewMergeRequest(mergeRequest) {
      console.log(`查看合并请求 ${mergeRequest.title}`)
    },
    approveMergeRequest(mergeRequest) {
      console.log(`${mergeRequest.status === 'open' ? '批准' : '撤销'}合并请求 ${mergeRequest.title}`)
    }
  }
}
</script>

<style>
.merge-requests-page {
  padding: 20px;
}
</style>