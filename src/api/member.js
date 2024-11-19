import request from "@/utils/request";

// 获取成员列表
export function getMemberList(id) {
  return request({
    url: "/member",
    method: "get",
    params:{projectId:id},
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 新增项目成员 
export function addMember(data) {
  return request({
    url: "/member",
    method: "post",
    data: data,
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 保存项目成员变更
export function saveMember(data) {
  return request({
    url: "/member",
    method: "put",
    data: data,
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 删除项目成员
export function deleteMember(id) {
  return request({
    url: "/member/" + id,
    method: "delete",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}
