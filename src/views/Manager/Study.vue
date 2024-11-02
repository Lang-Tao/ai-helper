<template>
  <div style="display:flex; width:100%; height:100%">
    <!--视频栏-->
    <el-container class="study-box" style="flex:3; display:flex; flex-direction:column">
      <!--IT类-->
      <div class="class-box">
        <span>IT类</span>
        <div class="video-box">
          <div class="video-item" v-for="(item,index) in ITVideoList" :key="index" @click="goToVideo(item.address)">
            <img :src="item.img" alt="">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <!--金融类-->
      <div class="class-box">
        <span>金融类</span>
        <div class="video-box">
          <div class="video-item" v-for="(item,index) in financeVideoList" :key="index" @click="goToVideo(item.address)">
            <img :src="item.img" alt="">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <!--新手引导-->
      <div class="class-box">
        <span>新手引导</span>
        <div class="video-box">
          <div class="video-item" v-for="(item,index) in newGuideVideoList" :key="index" @click="goToVideo(item.address)">
            <img :src="item.img" alt="">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
    </el-container>
    
    <!--评论区-->
    <el-container class="comments-box" style="flex:1;">
      评论区
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
    data() {
      return {
        ITVideoList: [
          {
            img: require('@/assets/img/it1.png'),
            title: "3小时前端入门教程（HTML+CSS+JS）",
            address:'https://www.bilibili.com/video/BV1BT4y1W7Aw/'
          },
          {
            img: require('@/assets/img/it2.jpg'),
            title: "30分钟零基础程序员（前端）速成，我收藏了",
            address:'https://www.bilibili.com/video/BV1ZW42197oE'
          },
          {
            img: require('@/assets/img/it3.jpg'),
            title: "前端技术的十八年风雨（2006-2024）",
            address:'https://www.bilibili.com/video/BV1eC411p73m'
          },
          {
            img: require('@/assets/img/it4.png'),
            title: "【HTML+CSS+JS+Vue】比大学课程还详细...",
            address:'https://www.bilibili.com/video/BV1oz421q7BB'
          },
          {
            img: require('@/assets/img/it5.jpg'),
            title: "前端Web开发HTML5+CSS3+移...",
            address:'https://www.bilibili.com/video/BV1kM4y127Li'
          },
        ],
        financeVideoList: [
          {
            img: require('@/assets/img/fin1.jpg'),
            title: "10分钟搞懂金融到底是怎么回事儿！年薪...",
            address:'https://www.bilibili.com/video/BV1T54y1H7xF'
          },
          {
            img: require('@/assets/img/fin2.jpg'),
            title: "爆肝2万字，我把美联储历次降息周期复盘...",
            address:' https://www.bilibili.com/video/BV1RZWSeSExQ'
          },
          {
            img: require('@/assets/img/fin3.jpg'),
            title: "罕见！中国增持美债，释放什么信号？沙利...",
            address:' https://www.bilibili.com/video/BV1FH4y1F7MB'
          },
          {
            img: require('@/assets/img/it4.png'),
            title: "【HTML+CSS+JS+Vue】比大学课程还详细...",
            address:'https://www.bilibili.com/video/BV1oz421q7BB'
          },
          {
            img: require('@/assets/img/it5.jpg'),
            title: "前端Web开发HTML5+CSS3+移...",
            address:'https://www.bilibili.com/video/BV1kM4y127Li'
          },
        ],
        newGuideVideoList: [
          {
            img: require('@/assets/img/it1.png'),
            title: "3小时前端入门教程（HTML+CSS+JS）",
            address:'https://www.bilibili.com/video/BV1BT4y1W7Aw/'
          },
          {
            img: require('@/assets/img/it2.jpg'),
            title: "30分钟零基础程序员（前端）速成，我收藏了",
            address:'https://www.bilibili.com/video/BV1ZW42197oE'
          },
          {
            img: require('@/assets/img/it3.jpg'),
            title: "前端技术的十八年风雨（2006-2024）",
            address:'https://www.bilibili.com/video/BV1eC411p73m'
          },
          {
            img: require('@/assets/img/it4.png'),
            title: "【HTML+CSS+JS+Vue】比大学课程还详细...",
            address:'https://www.bilibili.com/video/BV1oz421q7BB'
          },
          {
            img: require('@/assets/img/it5.jpg'),
            title: "前端Web开发HTML5+CSS3+移...",
            address:'https://www.bilibili.com/video/BV1kM4y127Li'
          },
        ],
      };
    },
  methods: {
    goToVideo(address){
      window.open(address)
    },
  },
}
</script>

<style scoped>
.study-box{
  margin:16px
}
.class-box{
  width:100%;
  height:240px;
  margin-top: 8px;
  margin-left: 20px;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}
.comments-box{
  box-shadow: -1px 1px 5px 1px #cccccc7e;
  padding: 16px;
}
.video-box{
  width:100%;
  height: 200px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.video-item{
  width: 220px;
  height: 180px;
  padding: 20px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-item:hover{
  color: hsl(207, 100%, 71%);
  background-color: #cccccc52;
  border-radius: 8px;
  cursor: pointer;
}
.video-item img{
  width: 100%;
  height: 120px;
}
.video-item span{
  margin-top: 16px;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
}
</style>