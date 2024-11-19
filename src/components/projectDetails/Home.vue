<template>
  <div style=" display: flex; justify-content: flex-start; align-items: flex-start; height: 100vh; width: 100%;">
    <div class="main" style="width: 75%; background-color: white; height: 100vh; flex-direction:column; display:flex; justify-content: flex-start; align-items: flex-start">
     
        <div class="OverView" style="display: flex; justify-content: flex-start; align-items: flex-start; width: 100%; height:670px ">
            <div style="flex:1; display:flex; flex-direction:column; height: 900px">
                <div class="box" style=" height:300px; margin:20px;">
                    <span class="boxTitle" herf="www.baidu.com" >代码仓库</span> <span class="boxTitle1"> > </span>
                </div>
                
                <div class="box" style=" height:250px; margin:0 20px 20px;">
                    <span class="boxTitle" >最近文件</span> <span class="boxTitle1"> > </span>
                </div>
            
            </div>

        
            <div style="flex:1; display:flex; flex-direction:column; height: 900px">
                
                <div class="box" style=" height:300px; margin:20px 20px 20px 0; ">
                    <span class="boxTitle" >构建计划</span> <span class="boxTitle1"> > </span>
                </div>

                
                <div class="box" style=" height:250px; margin:0 20px 20px 0; ">
                    <span class="boxTitle" >Wiki文档</span> <span class="boxTitle1"> > </span>
                </div>

                
            </div>
        </div>

        <div class="DongTai">
            项目动态
        </div>

    </div>

    <div class="GongGaoLan" style="width: 20%; height: 100vh; position: fixed; right: 0;  background-color: #fcfcfd;">

        <div style=" height: 100vh; display: flex; justify-content: flex-start; align-items: flex-start;box-shadow: 0 2px 4px rgba(0, 0, 0, .1)">
            <span style="font-size: 18px; font-weight: 500; margin:20px">项目公告</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['address'],
    name: "Home",
    data() {
        return {};
    },
};
</script>

<style scoped>
.boxTitle{
    font-size: 15px;
    font-weight: 500;
    margin:10px 2px 10px 20px;
}
.boxTitle1{
    font-size: 15px;
    font-weight: 500;
    margin:10px 5px 10px 3px;
    color:#b9b9b9
}

.boxTitle:hover{
    color: #409eff;
    cursor: pointer;
}
.boxTitle:hover + .boxTitle1{
    color: #565656;
}
.box{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
    background-color:#f4f5f7;
    display:flex; 
    justify-content: flex-start; 
    align-items: flex-start
}

</style>
