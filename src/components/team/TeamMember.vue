<template>
  <div class="team-member">
    <div class="header-box">
      <el-select v-model="selectedProjectName" placeholder="请选择项目">
        <el-option v-for="project in projectList" :key="project.address" :value="project.name">
          {{ project.name }}
        </el-option>
      </el-select>

      <div class="btn-box">
        <el-input v-model="newMemberName" placeholder="请输入成员名称" style="margin-right: 10px" size="mini"></el-input>
        <el-button type="text" @click="addMember">添加成员</el-button>
        <el-button type="text" @click="saveTeam">保存更改</el-button>
      </div>
    </div>

    <div class="member-list-container">
      <el-table class="member-list" :data="currentTeam.members" style="width: 100%" 
      :row-style="{ height: '20px' }" :cell-style="{ padding: '7px' }" >
        <el-table-column label="成员名称" align="center" width="300">
          <template slot-scope="scope">
            <div class="username">
              <el-avatar :src="scope.row.user.avatar" size="small"></el-avatar>

              <span style="margin-left: 10px">{{ scope.row.user.username }}</span>

              <el-button type="text" icon="el-icon-delete" @click="deleteMember(scope.row)" style="margin-left: 10px"></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center" width="590">
          <template slot-scope="scope">

            <span>{{ scope.row.user.email }}</span>

          </template>
        </el-table-column>
        <el-table-column label="角色" align="center" width="500">
          <template slot-scope="scope">

            <el-select class="role-select" v-model="scope.row.role" placeholder="选择角色" size="small">
              
              <el-option label="项目经理" value="项目经理"></el-option>
              <el-option label="前端" value="前端"></el-option>
              <el-option label="后端" value="后端"></el-option>
              <!-- 添加其他角色选项 -->
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getProjectList } from "@/api/project";
import {
  getMemberList,
  addMember,
  saveMember,
  deleteMember,
} from "@/api/member";

export default {
  name: "TeamMember",
  data() {
    return {
      isAdmin: true,
      projectList: [],
      selectedProjectName: "",
      currentTeam: {},
      newMemberName: "",
    };
  },
  methods: {
    getProjectList() {
      getProjectList()
        .then((res) => {
          if (res.code === 0) {
            this.projectList = res.data;
            this.selectedProjectName =
              this.projectList.length > 0 ? this.projectList[0].name : "";
            this.currentTeam = this.getTeamById(this.selectedProject.id);
          } else {
            console.error(res.message || "获取列表失败");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },

    // 根据id获取团队信息
    getTeamById(projectId) {
      getMemberList(projectId)
        .then((res) => {
          if (res.code === 0) {
            console.log("获取团队信息接口返回数据：" + res);
            console.log(res);

            this.currentTeam = res.data;
          } else {
            console.error(res.message || "获取团队信息失败");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },

    // todo 提交团队信息并保存
    saveTeam() {},

    // todo 根据username搜索用户
    // todo 添加成员
    addMember(newMemberName) {},

    // 删除成员
    deleteMember(member) {
      const projectId = this.selectedProject.id;
      deleteMember(projectId, member.id)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("删除成功");
            this.currentTeam.members = this.currentTeam.members.filter(
              (m) => m.id !== member.id
            );
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },
  },
  watch: {
    selectedProjectName(newVal) {
      this.selectedProject = this.projectList.find(
        (item) => item.name === newVal
      );
      this.getTeamById(this.selectedProject.id);
    },
  },
  created() {
    this.getProjectList();
  },
};
</script>

<style scoped>
.team-member {
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.btn-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.member-list-container {
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #cccccc64;
  border-radius: 5px;
}
.member-list {
  text-align: center;
}
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.role-select {
  width: 120px;
}
.username {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>


