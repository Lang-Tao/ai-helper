import request from "@/utils/request";

// 连接bot
export function connectBot(data) {
  return request({
    url: "/bot/connect",
    method: "post",
    data
  });
}