<template>
  <div>
    <div id="position_demo"></div>
  </div>
</template>

<script>
export default {
  name: "ChatBot",
  mounted() {
    const version = '0.1.0-beta.5'; 
    const bot_id = '7401422954770612243';
    const title = '';
    const icon = 'https://lf-bot-studio-plugin-resource.coze.cn/obj/bot-studio-platform-plugin-tos/artist/image/7e813aa2c7e14ebb9e2d1a989acfb128.png';
    const lang = 'zh-CN';
    const layout = 'pc';
    const width = 800;

    // 动态加载SDK脚本
    const script = document.createElement("script");
    script.src = `https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/${version}/libs/cn/index.js`;
    script.onload = () => {
      // 初始化聊天客户端
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id,
        },
        componentProps: {
          title,
          icon,
          width,
        },
        el: document.getElementById('position_demo'),
      });
    };
    document.head.appendChild(script);
  }
};
</script>

<style scoped>
#position_demo {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
</style>