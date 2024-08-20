<template>
  <div>
    <el-table :data="files" style="width: 100%" @row-click="handleRowClick">
      <el-table-column prop="name" label="文件名" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 'folder' ? 'success' : 'info'">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleRowClick(row) {
      this.$emit('file-selected', row);
    }
  }
};
</script>

