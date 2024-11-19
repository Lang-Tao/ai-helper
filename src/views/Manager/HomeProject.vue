<template>
  <div class="container">
    <div class="select-box">
      <el-select v-model="selectedProject" filterable placeholder="请选择">
        <el-option
          v-for="project in projectList"
          :key="project.address"
          :label="project.name"
          :value="project.name">
        </el-option>
      </el-select>

    </div>

    <div class="box1">
      <span class="box-title"><i class="el-icon-coin" style="margin-right: 10px"></i>团队项目概览</span>
      <div class="display-box">

        <div class="inner-box">
          <span class="inner-title"><i class="el-icon-pie-chart" style="margin-right: 10px"></i>需求交付周期</span>
          
          <span class="inner-content">20天</span>

          <div class="charts">
            <lineChart
              :chartData="chartData"
              height="150px"
              width="300px"
            ></lineChart>
          </div>

        </div>

        <div class="inner-box">
          <span class="inner-title"><i class="el-icon-pie-chart" style="margin-right: 10px"></i>需求完成率</span>
          <span class="inner-content">65%</span>

          <div class="charts">
            <lineChart
              :chartData="chartData"
              height="150px"
              width="300px"
            ></lineChart>
          </div>
        </div>

        <div class="inner-box">
          <span class="inner-title"><i class="el-icon-help" style="margin-right: 10px"></i>缺陷修复周期</span>
          <span class="inner-content">5天</span>

          <div class="charts">
            <lineChart
              :chartData="chartData1"
              height="150px"
              width="300px"
            ></lineChart>
          </div>
        </div>

        <div class="inner-box">
          <span class="inner-title"><i class="el-icon-help" style="margin-right: 10px"></i>缺陷修复率</span>
          <span class="inner-content">73%</span>

          <div class="charts">
            <lineChart
              :chartData="chartData2"
              height="150px"
              width="300px"
            ></lineChart>
          </div>
        </div>

        <div class="inner-box">
          <span class="inner-title"><i class="el-icon-edit-outline" style="margin-right: 10px"></i>构建成功率</span>
          <span class="inner-content">97%</span>

          <div class="charts">
            <lineChart
              :chartData="chartData"
              height="150px"
              width="300px"
            ></lineChart>
          </div>
        </div>

        <div class="inner-box-right">
          <span class="inner-title"><i class="el-icon-printer" style="margin-right: 10px"></i>部署成功率</span>
          <span class="inner-content">97%</span>

          <div class="charts">
            <lineChart
              :chartData="chartData3"
              height="150px"
              width="300px"
            ></lineChart>
          </div>
        </div>
      </div>
    </div>

    <div class="box2">
        <div class="box2-1">

            <span class="box-title"><i class="el-icon-postcard" style="margin-right: 10px"></i>项目整体进展</span>
            
            <div class="project-box">
              <!--v-for显示多个项目情况-->
              <div class="project-item">
                <span class="project-title">示例项目</span>
                <el-progress :percentage="50" :show-text="false"></el-progress>

                <div class="project-info">

                  <div style="display: flex; flex-direction: row; ">
                    <div class="info-item">
                      <span class="info-title">逾期需求</span>
                      <span class="info-content">0</span>
                    </div>
                    <div class="info-item">
                      <span class="info-title">逾期需求</span>
                      <span class="info-content">3</span>
                    </div>
                  </div>

                  <div style="display: flex; flex-direction: row; margin-top: 20px">
                    <div class="info-item">
                      <span class="info-title">逾期需求</span>
                      <span class="info-content">1</span>
                    </div>
                    <div class="info-item">
                      <span class="info-title">逾期需求</span>
                      <span class="info-content">1</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        </div>
        <div class="box2-2">
            <span class="box-title"><i class="el-icon-date" style="margin-right: 10px"></i>团队逾期需求</span>
            <el-select class="inner-select" size="mini" filterable placeholder="请选择用户"></el-select>
        </div>
    </div>

  </div>
</template>

<script>
import lineChart from "@/components/others/LineChart";
import { getProjectList } from "@/api/project";

export default {
  name: "manager",
  components: { lineChart },
  data() {
    return {
      projectList: [],
      selectedProject: "全部项目",
      chartData: {
        name: [],
        label: [],
        data: {
          value: [],
          value1: [],
        },
      },
      chartData1: {
        name: [],
        label: [],
        data: {
          value: [],
          value1: [],
        },
      },
      chartData2: {
        name: [],
        label: [],
        data: {
          value: [],
          value1: [],
        },
      },
      chartData3: {
        name: [],
        label: [],
        data: {
          value: [],
          value1: [],
        },
      },
      echartsName: "", // 自定义名称
      echartsUnit: "", // 单位
    };
  },
  mounted() {
    // 调用接口
    this.getFaceData();
    this.getProjectList();
  },
  methods: {
    getFaceData() {
      // 此处应该调用接口
      // 暂时使用假数据
      this.chartData.name = ["天数"];
      this.echartsUnit = "kg"; // 单位
      this.chartData.label = [
        "2023-11-29 16:00:37",
        "2023-11-29 18:11:36",
        "2023-11-29 19:04:15",
        "2023-11-29 19:21:09",
        "2023-11-29 19:35:39",
        "2023-11-29 19:49:32",
        "2023-11-30 15:38:58",
      ];
      this.chartData.data.value = [24, 24, 24, 24, 26, 28, 24];

      this.chartData1.name = ["天数"];
      this.chartData1.label = [
        "2023-11-29 16:00:37",
        "2023-11-29 18:11:36",
        "2023-11-29 19:04:15",
        "2023-11-29 19:21:09",
        "2023-11-29 19:35:39",
        "2023-11-29 19:49:32",
        "2023-11-30 15:38:58",
      ];
      this.chartData1.data.value = [24, 14, 24, 24, 26, 28, 24];

      this.chartData2.name = ["天数"];
      this.chartData2.label = [
        "2023-11-29 16:00:37",
        "2023-11-29 18:11:36",
        "2023-11-29 19:04:15",
        "2023-11-29 19:21:09",
        "2023-11-29 19:35:39",
        "2023-11-29 19:49:32",
        "2023-11-30 15:38:58",
      ];
      this.chartData2.data.value = [24, 14, 24, 24, 24, 28, 30];

      this.chartData3.name = ["天数"];
      this.chartData3.label = [
        "2023-11-29 16:00:37",
        "2023-11-29 18:11:36",
        "2023-11-29 19:04:15",
        "2023-11-29 19:21:09",
        "2023-11-29 19:35:39",
        "2023-11-29 19:49:32",
        "2023-11-30 15:38:58",
      ];
      this.chartData3.data.value = [4, 14, 24, 20, 24, 28, 30];
    },
    getProjectList() {
      getProjectList()
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.projectList = [
              { name: "全部项目", address: "全部项目" },
            ].concat(res.data);
            this.selectedProject =
              this.projectList.length > 0 ? this.projectList[0].name : "";
          } else {
            console.error(res.message || "获取列表失败");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("@/assets/img/home_bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.select-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 97%;
  margin-top: 20px;
}
.select-box .el-select {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
}
.box1 {
  height: 250px;
  width: 97%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.display-box {
  display: flex;
  flex-direction: row;
  padding: 0 30px;
}
.box2 {
  height: 400px;
  width: 97%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.box2-1 {
  display: flex;
  flex-direction: column;
  flex: 5;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.box2-2 {
  display: flex;
  margin-left: 20px;
  flex: 2;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.box-title {
  font-size: 16px;
  margin: 20px 28px;
}
.inner-select {
  margin: 20px 28px;
}
.inner-box {
  border-right: 1px solid #e6e6e6;
  margin: 10px;
  flex: 1;
  height: 170px;
  width: 230.156px;
  display: flex;
  flex-direction: column;
}
.inner-box-right {
  margin: 10px;
  flex: 1;
  height: 170px;
  width: 230.156px;
  display: flex;
  flex-direction: column;
}
.inner-content {
  font-size: 20px;
  margin: 5px 0 0 25px;
}
.charts {
  margin: -30px 0 0 -30px;
}
.project-box {
  display: flex;
  flex-direction: column;
  margin: 10px 28px;
}
.project-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 2px;
  border: 1px solid #46464646;
  padding: 20px 20px 0 20px;
}
.project-item:hover {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  background-color: #f7f9fc;
  cursor: pointer;
}
.el-progress {
  width: 100px;
  margin: 16px 0;
}
.project-info {
  border-top: 1px solid #46464646;
  padding: 20px 0;
}
.info-title {
  font-size: 12px;
  color: #8c8c8c;
}
.info-item {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.info-content {
  font-size: 24px;
  color: #000000;
  font-weight: 600;
}

.el-icon-pie-chart {
  color: #0a9cfc;
}
.el-icon-help {
  color: #de4753;
}
.el-icon-edit-outline,
.el-icon-printer {
  color: #2068de;
}
</style>
