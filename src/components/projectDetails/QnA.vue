<template>
  <div class="chatgpt-container">

    <!-- 聊天窗口 -->
    <div class="chat-window">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        class="message-container"
        :class="message.type"
      >
        <div v-if="message.type === 'bot'" class="avatar">
          <img src="@/assets/img/AIlogo.png" alt="bot-avatar" class="avatar-image">
        </div>
        
        <div class="message">
          <vue-markdown :source="message.content" v-highlight>
          </vue-markdown>
        </div>
      </div>
    </div>

    <!-- 输入框和发送按钮 -->
    <div class="input-container">
      <el-input 
        ref="userInputRef"
        v-model="userInput" 
        placeholder="在此输入问题" 
        :disabled="isProcessing"  
        @keydown.enter.native="sendMessage" 
        class="input-box"
      ></el-input>
      
      <el-button 
        type="primary" 
        @click="sendMessage"
        :disabled="isProcessing" 
        class="send-button"
      >
        发送
      </el-button>
    </div>
  </div>
</template>

<script>
import { askBot } from "@/api/bot";

export default {
  data() {
    return {
      userInput: "",
      messages: [{ type: "bot", content: "你好！有什么我可以帮你的吗?" }],
      isProcessing: false, // 标志变量，用于跟踪机器人是否正在处理中
    };
  },
  mounted() {
    document.querySelector("input").focus();
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === "" || this.isProcessing) return; // 如果为空或正在处理则返回

      this.messages.push({ type: "user", content: this.userInput });
      const userMessage = this.userInput;
      this.userInput = "";
      this.isProcessing = true; // 标记为处理中

      try {
        const response = await askBot(userMessage);

        console.log(response);

        this.messages.push({
          type: "bot",
          content: response.choices[0].message.content,
        });
      } catch (error) {
        console.error("Error occurred:", error);
        this.messages.push({
          type: "bot",
          content: "抱歉，我暂时无法处理您的请求。",
        });
      } finally {
        this.isProcessing = false; // 处理完成，标记为未处理
        this.$refs.userInputRef.$el.querySelector("input").focus();
      }
    },
  },
};
</script>

<style lang="scss">
/* 页面整体样式 */
.chatgpt-container {
  display: flex;
  flex-direction: column;
  height: 780px;
  background-image: url("@/assets/img/home_bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
}

/* 聊天窗口样式 */
.chat-window {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 消息容器样式 */
.message-container {
  display: flex;
  align-items: flex-start; /* 确保头像和消息垂直对齐 */
  margin: 10px 0;
}

.message-container.user {
  justify-content: flex-end !important;
}

.message-container.bot {
  justify-content: flex-start !important;
}

/* 头像样式 */
.avatar {
  margin-right: 10px; /* 用户头像距离消息的间距 */
}

img {
  border: solid 1px #ccc;
  border-radius: 50%;
}

.avatar-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* 消息样式 */
.message {
  max-width: 60%;
  padding: 0 15px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-container.user {
  justify-content: flex-end; //右侧显示用户的聊天消息
}

.message-container.user .message {
  background-color: #1f86f4 !important;
  color: white !important;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.4);
}

.message {
  background-color: #f1f1f1 !important;
  color: #333 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 输入框和发送按钮容器 */
.input-container {
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

/* 输入框样式 */
.input-box {
  flex-grow: 1;
  margin-right: 10px;
}

/* 发送按钮样式 */
.send-button {
  width: 100px;
  background-color: #007bff;
  border-color: #007bff;
}

.send-button:disabled {
  background-color: #cccccc;
  border-color: #cccccc;
}
</style>
