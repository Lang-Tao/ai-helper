<template>
    <div>
  <el-card shadow="never" >
    <h2>项目设置</h2>
    
    <el-form :model="project" label-width="120px" :rules="rules">


        <!-- 项目名称 -->
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="project.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>


      <!-- 项目地址 -->
      <el-form-item label="项目地址" prop="address">
        <el-input v-model="project.address" placeholder="请输入项目地址" disabled>
          <template slot="prepend">https://ai-helper/p/</template>
        </el-input>
        <el-alert 
          title="注意：修改项目地址将导致项目的访问 URL（包含 Git 仓库的 URL）改变，在此之前的 URL 地址将失效。"
          type="warning" 
          show-icon 
          :closable="false"
          style="line-height:normal;"
        />

      </el-form-item>

    
      <!-- 项目描述 -->
       <el-form-item label="项目描述" prop="description"  style="font-size: 16px; font-weight: bold; color:black">
            <el-input type="textarea" resize="none" rows="4" placeholder="100字以内项目描述（选填）" v-model="project.description"></el-input>
          </el-form-item>

      <!-- 项目时间 -->
      <!-- <el-form-item label="项目时间">
        <el-date-picker
          v-model="project.startDate"
          type="date"
          placeholder="开始时间">
        </el-date-picker>
        <span> ~ </span>
        <el-date-picker
          v-model="project.endDate"
          type="date"
          placeholder="完成时间">
        </el-date-picker>
      </el-form-item> -->

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { getProjectInfo, updateProject } from "@/api/project";

export default {
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      project: {},
      rules: {
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入项目标识", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("更新:", this.project);

      updateProject(this.project).then((res) => {
        console.log(res);

        if (res.code === 0) {
          Message({
            message: "更新成功",
            type: "success",
            duration: 2000,
          });
        } else {
          Message({
            message: "更新失败",
            type: "error",
            duration: 2000,
          });
        }
      });
    },

    //  根据项目地址获取项目信息
    getProjectByAddress(address) {
      getProjectInfo(address).then((res) => {
        console.log("地址" + address + "获取到项目：");
        console.log(res);

        if (res.code === 0) {
          this.project = res.data;
        }
      });
    },
  },
  created() {
    this.project = this.getProjectByAddress(this.address);
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
  margin-left: 20px;
}
.el-card {
  width: 60%;
  border: 0;
}
</style>
