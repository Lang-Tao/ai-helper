<template>
  <div class="container">
    <div class="select-box">
      <el-select>
        <el-option v-model="opt" filterable placeholder="请选择"
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

    </div>

    <div class="box1">
      <span>团队事项概览</span>
      <div class="display-box">
        <div class="inner-box"></div>
        <div class="inner-box"></div>
        <div class="inner-box"></div>
        <div class="inner-box"></div>
        <div class="inner-box"></div>
        <div class="inner-box"></div>
      </div>
    </div>

    <div class="box2">
        <div class="box2-1">
            <span>项目整体进展</span>
            <div></div>
        </div>
        <div class="box2-2"></div>
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
      }
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

<style scoped>
.container{
    width: 100%; 
    height: 92vh;
    display: flex;
    flex-direction:column; 
    justify-content: flex-start; 
    align-items: center; 
    background-color: #f0f0f0; 
}
.select-box{
    display: flex; 
    flex-direction: column; 
    justify-content:flex-start; 
    align-items:flex-start; 
    width: 95%; 
    margin-top: 20px;
}
.select-box .el-select{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
    width:400px
}
.box1{
    height:250px; 
    width: 95%; 
    margin-top: 20px; 
    display:flex; 
    flex-direction:column; 
    background-color: #ffffff; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
}
.display-box{
    display: flex;
    flex-direction: row;
}
.box2{
    height: 400px;
    width: 95%;
    margin-top: 20px; 
    display: flex;
    flex-direction: row;
}
.box2-1{
    flex:5;
    background-color: #ffffff; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
}
.box2-2{
    margin-left: 20px;
    flex:2;
    background-color: #ffffff; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
}
.box1 span{
    font-size: 16px;
    margin:20px  28px;
}
.inner-box{
    flex:1;
    border-right: 1px solid;
    height: 100%;
}
</style>
