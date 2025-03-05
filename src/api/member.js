import request from "@/utils/request";

// 获取成员列表
export function getMemberList(address) {
  return request({
    url: `/member?address=${address}`,
    method: "get",

  });
}

// 新增项目成员 
export function addMember(address, username) {
  return request({
    url: "/member",
    method: "post",
    data: {
      address: address,
      username: username
    },
  });
}

// 保存项目成员变更
export function saveMember(data) {
  return request({
    url: "/member",
    method: "put",
    data: data,
  });
}

// 删除项目成员
export function deleteMember(id) {
  return request({
    url: "/member/" + id,
    method: "delete",
  });
}
