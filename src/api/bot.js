import request from "@/utils/request";

// 提问bot
export function askBot(question, address) {
  const params = new URLSearchParams({ question }).toString();  // 创建键值对并转换为查询字符串
  return request({
    url: `/ask-kimi?question=${params}&address=${address}`,  // 将查询字符串附加到URL上
    method: "GET",
  });
}

// 提问bot-流式回答
export function askBotStream(question) {
  const params = new URLSearchParams({ question }).toString();  // 创建键值对并转换为查询字符串
  return request({
    url: `/ask-ty?${params}`,  // 将查询字符串附加到URL上
    method: "GET",
    responseType: "stream",  // 设置响应类型为流
  });
}

// 项目ai审查
export function aiCheck(repo) {
  return request({
    url: `/dmsc?${'repo=' + repo}`,
    method: 'get'
  })
}

// 项目ai总结
export function aiSummary(repo) {
  return request({
    url: `/ask-zjxm?${'repo=' + repo}`,
    method: 'get'
  })
}