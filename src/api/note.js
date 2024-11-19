import request from "@/utils/request";

// 获取笔记列表
export function getNoteList() {
  return request({
    url: "/note",
    method: "get"
  });
}

// 新建笔记文件夹
export function createNoteFolder(data) {
  return request({
    url: "/folder",
    method: "post",
    data: data,
    header: {
        Authorization: localStorage.getItem("token")
    }
  });
}

// 删除笔记文件夹
export function deleteNoteFolder(id) {
  return request({
    url: "/folder/" + id,
    method: "delete",
    header: {
        Authorization: localStorage.getItem("token")
    }
  });
}