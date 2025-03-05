<template>
  <div class="container">

    <div class="header">
      
      <el-select style="box-shadow: 0 2px 4px rgba(0, 0, 0, .1);" v-model="selectedProject">
        <el-option
          v-for="project in projectList"
          :key="project.address"
          :label="project.name"
          :value="project.name">
        </el-option>
      </el-select>

    </div>

    <div class="task-box">

      <div style="margin:20px; font-size: 16px;">
        <i class="el-icon-document"/>
        <span style="margin-left: 10px; font-weight:400;">我的项目事项</span>
      </div>

      <div v-if="taskList.length !== 0" style="height:430px; width: 95%; margin: 0 auto; background-color: #ffffff; ">
        <el-table
          :data="filteredTaskList"
          
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="300">
              <template slot-scope="scope">
                <span class="task-title" @click="openTaskDetail(scope.row)">{{ scope.row.title }}</span>
              </template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="130"
            align="center">
            <template slot-scope="scope">

              <el-select v-model="scope.row.status" size="mini" style="width:90px">

                <el-option v-for="status in statusList" :key="status" :label="status" :value="status">
                  <template>
                    <el-tag size="mini" :type="status === '未开始' ? 'danger' : status === '进行中' ? 'warning' : 'success'">
                      {{status}}
                    </el-tag>
                  </template>
                </el-option>
              </el-select>
              
            </template>
          </el-table-column>

          <!-- <el-table-column
            prop="priority"
            label="优先级"
            width="180"
            align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.priority === '高' ? 'danger' : scope.row.priority === '中' ? 'warning' : 'success'">
                {{ scope.row.priority }}
              </el-tag>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="deadline"
            label="截止日期"
            sortable
            width="400"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sender"
            label="创建人"
            width="200"
            align="center">
              <template slot-scope="scope">
                <div class="username">
                  <el-avatar :src="scope.row.user" size="small"></el-avatar>
                  <span style="margin-left: 10px">{{ scope.row.sender }}</span>
                </div>
              </template>
          </el-table-column>
          <el-table-column
            prop="project"
            label="项目"
            width="180"
            align="center">
            <template slot-scope="scope">
              <span class="project-name" @click="goToProject(scope.row.projectAddress, scope.row.project)">{{scope.row.project}}</span>
            </template>
          </el-table-column>
         
        </el-table>

      </div>

      <div v-else style="height:430px; width: 95%; margin: 0 auto; background-color: #ffffff; 
      display: flex; justify-content: center; align-items: center; flex-direction: column">
        <img src="@/assets/img/issuesComplete.png" alt="" style="width: 200px">
        <span style="font-size: 18px; color: #999999; margin-top: 5px">暂无代办事项</span>
      </div>
      
    </div>

    <!-- 右侧任务详情部分 -->
    <div v-if="selectedTask" class="task-detail">
      <el-button class="close-btn" icon="el-icon-close" circle @click="closeTaskDetail" size="mini"></el-button>
      <div class="task-detail-container">
        <span class="task-detail-title">{{ selectedTask.title }}</span>
        <div style="margin-top: 20px">
          <span>状态：</span>
          <el-tag size="mini" :type="selectedTask.status === '未开始' ? 'danger' : selectedTask.status === '进行中' ? 'warning' : 'success'">
            {{selectedTask.status}}
          </el-tag>
          <!-- <span class="task-detail-label">优先级：</span>
          <el-tag size="mini" :type="selectedTask.priority === '高' ? 'danger' : selectedTask.priority === '中' ? 'warning' : 'success'">
            {{ selectedTask.priority }}
          </el-tag> -->
        </div>
        <div style="margin-top: 20px;color:#999999">
          <span>截止日期：</span>
          <span style="margin-left: 10px; ">{{ selectedTask.deadline }}</span>
        </div>
        <span class="task-detail-content">{{ selectedTask.content }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { getProjectList } from "@/api/project";
import { getTaskList } from "@/api/task";

export default {
	name: "UserTask",
	data() {
		return {
			projectList: [],
			taskList: [],
			filteredTaskList: [],
			selectedProject: "全部项目",
			statusList: ["未开始", "进行中", "已完成"],
			selectedTask: null,
		};
	},
	methods: {
		getTaskList() {
			// todo 获取该用户的taskList

			getTaskList().then((res) => {
				if (res.code === 0) {
					this.taskList = res.data.task;
					this.filteredTaskList = this.taskList;
				} else {
					console.error(res.message || "获取列表失败");
				}
			});
		},

		getProjectList() {
			getProjectList()
				.then((res) => {
					if (res.code === 0) {
						this.projectList = [
							{ name: "全部项目", value: "全部项目" },
						].concat(res.data);
						this.selectedProjectName =
							this.projectList.length > 0
								? this.projectList[0].name
								: "";
						this.currentTeam = this.getTeamById(
							this.selectedProject.id
						);
					} else {
						console.error(res.message || "获取列表失败");
					}
				})
				.catch((err) => {
					console.error("Error:", err);
				});
		},

		filterTasks() {
			if (this.selectedProject === "全部项目") {
				this.filteredTaskList = this.taskList;
			} else {
				this.filteredTaskList = this.taskList.filter(
					(task) => task.project === this.selectedProject
				);
			}
		},

		goToProject(address, name) {
			this.$router.push({
				name: "ProjectDetails",
				params: { address: address, title: name },
			});
		},

		openTaskDetail(task) {
			this.selectedTask = task; // 设置选中的任务详情
			console.log(this.selectedTask);
		},

		closeTaskDetail() {
			this.selectedTask = null; // 关闭任务详情
		},
	},
	mounted() {
		this.getProjectList();
		this.taskList = this.getTaskList();
		this.filterTasks();
	},
	watch: {
		selectedProject() {
			this.filterTasks();
		},
	},
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: #ffffff;
	width: 100%;
	min-height: 777px;
}
.header {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 95%;
	margin-top: 20px;
}
.task-box {
	border: 1px solid #cccccc82;
	display: flex;
	flex-direction: column;
	height: 650px;
	width: 95%;
	background-color: #ffffff;
	margin-top: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.username {
	display: flex;
	align-items: center;
	justify-content: center;
}
.project-name {
	cursor: pointer;
}
.project-name:hover {
	color: #409eff;
}
.task-title {
	cursor: pointer;
}
.task-title:hover {
	color: #409eff;
}
.task-detail {
	position: fixed;
	width: 40%;
	height: 100vh;
	right: -20px;
	background-color: #fff;
	box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1);
	padding: 30px;
}
.close-btn {
	position: relative;
	left: -44px;
	background-color: rgb(188, 188, 188);
	color: #fff;
}
.close-btn:hover {
	background-color: rgb(109, 109, 109);
}
.task-detail-container {
	display: flex;
	flex-direction: column;
}
.task-detail-title {
	font-size: 20px;
}
.task-detail-status {
	width: 50px;
	margin: 20px 5px;
}
.task-detail-label {
	margin-left: 20px;
}
.task-detail-content {
	margin: 20px 60px 20px 0;
	font-size: 16px;
	line-height: 30px;
}
</style>


