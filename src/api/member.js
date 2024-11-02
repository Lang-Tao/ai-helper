import request from "@/utils/request";

export function getMemberList(params) {
  return request({
    url: "/member",
    method: "get",
    params
  });
}

// 新增项目成员 
export function addMember(data) {
  return request({
    url: "/member",
    method: "post",
    data: data
  });
    
}