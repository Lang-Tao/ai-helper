import request from "@/utils/request";

// 获取项目列表
export function getProjectList() {
  return request({
    url: "/project",
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 创建项目
export function createProject(data) {
  return request({
    url: "/project",
    method: "POST",
    data:data,
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 根据项目地址获取项目信息
export function getProjectInfo(address) {
  return request({
    url: `/project/address?address=${address}`,
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 更新项目信息
export function updateProject(data) {
  return request({
    url: "/project",
    method: "PUT",
    data:data,
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 获取项目文件名
export function getProjectFileList(repo) {
  return request({
    url: `/gitea/listpath?repo=${repo}`,
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

// 根据 文件路径 和 仓库地址 获取文件
export function getProjectFileContent(path, address) {
  return request({
    url: `/gitea/getfile?path=${path}&address=${address}`,
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
}

//删除项目
export function deleteProject(address) {
  return request({
    url: `/project?address=${address}`,
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
}