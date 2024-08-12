<template>
    <div>
  <el-card shadow="never" >
    <h2>项目设置</h2>
    <el-form :model="projectForm" label-width="120px">
      <!-- 项目地址 -->
      <el-form-item label="项目地址" required>
        <el-input v-model="projectForm.url" placeholder="请输入项目名称" >
          <template slot="prepend">https://ai-helper/p/</template>
        </el-input>
        <el-alert 
          title="注意：修改项目地址将导致项目的访问 URL（包含 Git 仓库的 URL）改变，在此之前的 URL 地址将失效。Git 仓库地址修改方法：git remote set-url origin [NEW_URL]" 
          type="warning" 
          show-icon 
          effect="plain"
          :closable="false"
          style="line-height:normal;"
        />
      </el-form-item>

      <!-- 项目名称 -->
      <el-form-item label="项目名称" required>
        <el-input v-model="projectForm.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>

      <!-- 项目描述 -->
      <el-form-item label="项目描述">
        <el-input v-model="projectForm.description" placeholder="项目描述"></el-input>
      </el-form-item>

      <!-- 项目时间 -->
      <el-form-item label="项目时间">
        <el-date-picker
          v-model="projectForm.startDate"
          type="date"
          placeholder="开始时间">
        </el-date-picker>
        <span> ~ </span>
        <el-date-picker
          v-model="projectForm.endDate"
          type="date"
          placeholder="完成时间">
        </el-date-picker>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">更新</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>

<script>
export default {
    props: {
        address:{
          type: String,
          required: true
        },
    },
  data() {
    return {
      projectForm: {
        url: '',
        name: '',
        description: '',
        startDate: null,
        endDate: null,
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log('更新:', this.projectForm);
      // 这里可以添加提交逻辑，例如发送到服务器
    },
    handleCancel() {
      // 处理取消操作
      this.$message({
        message: '取消操作',
        type: 'info'
      });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
  margin-left: 20px;
}
.el-card{
    width: 60%;
    border: 0;
}
</style>
