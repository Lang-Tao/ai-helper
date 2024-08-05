<template>
  <div class="repository">
    <el-card>
      <div slot="header" class="clearfix">
        <span>代码存储库</span>
        <el-button style="float: right;" type="primary" @click="showAddRepositoryDialog">添加存储库</el-button>
      </div>

      <el-table :data="repositories" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="editRepository(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteRepository(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加存储库" :visible.sync="addRepositoryDialogVisible">
      <el-form :model="newRepository">
        <el-form-item label="名称">
          <el-input v-model="newRepository.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newRepository.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRepositoryDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRepository">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      repositories: [],
      addRepositoryDialogVisible: false,
      newRepository: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    fetchRepositories() {
      axios.get('/api/repositories')
        .then(response => {
          this.repositories = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    showAddRepositoryDialog() {
      this.addRepositoryDialogVisible = true;
    },
    addRepository() {
      axios.post('/api/repositories', this.newRepository)
        .then(response => {
          this.repositories.push(response.data);
          this.addRepositoryDialogVisible = false;
          this.newRepository = { name: '', description: '' };
        })
        .catch(error => {
          console.error(error);
        });
    },
    editRepository(repository) {
      // 实现编辑逻辑
    },
    deleteRepository(repository) {
      axios.delete(`/api/repositories/${repository.id}`)
        .then(response => {
          this.fetchRepositories();
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchRepositories();
  },
};
</script>

<style scoped>
.repository {
  margin: 20px;
}
</style>
