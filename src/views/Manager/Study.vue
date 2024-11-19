<template>
  <div style="display:flex; width:100%; height:100%">
    <!--视频栏-->
    <el-container class="study-box" style="flex:3; display:flex; flex-direction:column">
      <!--IT类-->
      <div class="class-box">
        <span>IT教学</span>
        <div class="video-box">
          <div class="video-item" v-for="(item,index) in ITVideoList" :key="index" @click="goToVideo(item.address)">
            <img :src="item.img" alt="">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <!--金融类-->
      <div class="class-box">
        <span>金融教学</span>
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
      <div class="comment-input-box">
        <el-input class="comment-input"
          type="textarea"
          :rows="2"
          placeholder="说些什么吧"
          resize="none"
          v-model="newComment"
          :autosize="{ minRows: 2, maxRows: 6}"
          maxlength="100">
        </el-input>
        
        <el-button class="comment-btn" type="primary" @click="addComment">发表</el-button>
    
      </div>
      <div class="comment-show-box">
        <div class="comment-item" v-for="(comment,index) in commentList" :key="index">
          <div class="comment-avator">
            <img :src="$store.state.user.avator" alt="" class="avatar-img">
          </div>
          <div class="comment-info">
            <span class="comment-name">{{comment.user}}</span>
            <span class="comment-content">{{comment.content}}</span>
          </div>
          
        </div>
      </div>
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
            img: require('@/assets/img/fin4.jpg'),
            title: "【中央财经大学】金融学（全85课）国家级...",
            address:'https://www.bilibili.com/video/BV1Gk4y1A7DZ'
          },
          {
            img: require('@/assets/img/fin5.jpg'),
            title: "【基德】经济是如何运行的？ 这...",
            address:'https://www.bilibili.com/video/BV1J64y1c7BN'
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
        newComment:'',
        commentList: [
          { user: '用户1', content: '这是一个示例评论' },
          { user: '用户2', content: '我觉得这个视频讲得很好！' },
          { user: '用户2', content: '这是一个测试用的长文字：举头望明月，低头思故乡；鹅鹅鹅，曲项向天歌；白日依山尽' },
        ],
      };
    },
  methods: {
    goToVideo(address){
      window.open(address)
    },
    addComment(){
      if(this.newComment){
        this.commentList.unshift({user: this.$store.state.user.username, content: this.newComment})
        this.newComment = ''
      }
    }
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
  height: 200px;
  border-radius: 5px;
}
.video-item span{
  margin-top: 16px;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
}
.comments-box{
  display: flex;
  flex-direction: column
}
.comment-input-box{
  display: flex;
  flex-direction: row;
}
.comment-input{
  width:310px
}
.comment-btn{
  margin-left: 7px;
  height: 53.3px;
}
.comment-show-box{
  margin-top:24px
}
.comment-item{
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
}
.comment-info{
  display: flex;
  flex-direction: column;
}
.avatar-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
}
.comment-name{
  font-size: 14px;
  font-weight: 300;
}
.comment-content{
  width: 860px;
  font-size: 16px;
  font-weight: 520;
  margin-top: 5px;
  max-width: 30ch; 
  overflow-wrap: break-word;
}
</style>