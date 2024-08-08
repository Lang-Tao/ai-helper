<template>
  <div style="display: flex;flex-direction:column; justify-content: flex-start; align-items: center; 
  background-color: #f0f0f0; width: 100%; height: 1200px">
    <div style="display: flex; flex-direction: column; justify-content:flex-start; align-items:flex-start; width: 95%; margin-top: 20px;">
      
      <el-select style="box-shadow: 0 2px 4px rgba(0, 0, 0, .1);" v-model="opt" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

    </div>

    <div style="display:flex; flex-direction:column; height:550px; width: 95%; background-color: #ffffff; margin-top: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, .1);">

      <div style="margin:30px 20px; font-size: 16px;">
        <i class="el-icon-document"/>
        <span style="margin-left: 10px; font-weight:400;">我的项目事项</span>
      </div>

      <div v-if="! projectIssues.length === 0" style="height:430px; width: 95%; margin: 0 auto; background-color: #ffffff; ">
        <el-table
          :data="projectIssues"
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
          </el-table-column>
          <el-table-column
            prop="name"
            label="状态"
            width="130">
          </el-table-column>
          <el-table-column
            prop="priority"
            label="优先级"
            width="180">
          </el-table-column>
          <el-table-column
            prop="data"
            label="截止日期"
            width="200">
          </el-table-column>
          <el-table-column
            prop="iteration"
            label="迭代"
            width="250">
          </el-table-column>
          <el-table-column
            prop="project"
            label="项目"
            width="180">
          </el-table-column>
         
        </el-table>

      </div>

      <div v-else style="height:430px; width: 95%; margin: 0 auto; background-color: #ffffff; 
      display: flex; justify-content: center; align-items: center; flex-direction: column">
        <img src="@/assets/img/issuesComplete.png" alt="" style="width: 200px">
        <span style="font-size: 18px; color: #999999; margin-top: 5px">暂无代办事项</span>
      </div>
      
    </div>

    <div style="height:500px; width: 95%; display:flex; margin-top:10px">

      <div style="height:500px; width: 49%; background-color: #ffffff; margin-top: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, .1);">

         <div style="margin:30px 20px; font-size: 16px;">
           <i class="iconfont icon-hebingqingqiu" />
          <span style="margin-left: 10px; font-weight:400;">我的合并请求</span>
        </div>

        <div v-if="! mergeIssues.length === 0" style="height:400px; width: 95%; margin: 0 auto; background-color: #ffffff; ">
          <!--项目合并所需表格（未完成）-->
        <el-table
          :data="mergeIssues"
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
          </el-table-column>
          <el-table-column
            prop="name"
            label="状态"
            width="130">
          </el-table-column>
          <el-table-column
            prop="priority"
            label="优先级"
            width="180">
          </el-table-column>
          <el-table-column
            prop="data"
            label="截止日期"
            width="200">
          </el-table-column>
          <el-table-column
            prop="iteration"
            label="迭代"
            width="250">
          </el-table-column>
          <el-table-column
            prop="project"
            label="项目"
            width="180">
          </el-table-column>
         
        </el-table>

      </div>

        <div v-else style="height:400px; width: 95%; margin: 0 auto; background-color: #ffffff; 
        display: flex; justify-content: center; align-items: center; flex-direction: column">
          <img src="@/assets/img/taskComplete.png" alt="" style="width: 200px">
          <span style="font-size: 18px; color: #999999; margin-top: 5px">暂无合并请求</span>
        </div>

      </div>
      

      <div style="height:500px; width: 49%; background-color: #ffffff; margin: 20px 0 0 2%;  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);">

      </div>


    </div>
  

  </div>
</template>

<script>
  export default {
    name: "manager",
    data() {
      return{
        options: [
          {
            value: '选项1',
            label: '全部'
          },
          {
            value: '选项2',
            label: '项目1'
          },
        ],
        opt: '选项1',
        projectIssues:[
          
        ],
        mergeIssues:[
          
        ],
      }
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

<style scoped>

</style>
