<template>
  <div style="padding:40px">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="role" label="成员角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column label="添加成员" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.addMember"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="删除成员" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.deleteMember"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="修改成员角色" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.modifyRole"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="审查代码" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.reviewCode"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="修改仓库代码" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.modifyCode"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TeamPermission",
  data() {
    return {
      tableData: [
        {
          role: "项目经理",
          addMember: true,
          deleteMember: true,
          modifyRole: true,
          reviewCode: true,
          modifyCode: false,
        },
        {
          role: "产品经理",
          addMember: false,
          deleteMember: false,
          modifyRole: false,
          reviewCode: true,
          modifyCode: true,
        },
        {
          role: "前端",
          addMember: false,
          deleteMember: false,
          modifyRole: false,
          reviewCode: true,
          modifyCode: true,
        },
        {
          role: "后端",
          addMember: false,
          deleteMember: false,
          modifyRole: false,
          reviewCode: true,
          modifyCode: true,
        },
        {
          role: "测试",
          addMember: false,
          deleteMember: false,
          modifyRole: false,
          reviewCode: true,
          modifyCode: true,
        },
        {
          role: "运维",
          addMember: false,
          deleteMember: false,
          modifyRole: false,
          reviewCode: true,
          modifyCode: true,
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
