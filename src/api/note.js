import request from "@/utils/request";

// 获取笔记列表
export function getNoteList(address) {
  return request({
    url: `/note/notelist?address=${address}`,
    method: "get",

  });
}

// 新建笔记文件夹
export function createNoteFolder(data) {
  return request({
    url: "/folder",
    method: "post",
    data: data,
  });
}

// 删除笔记文件夹
export function deleteNoteFolder(id) {
  return request({
    url: "/folder/" + id,
    method: "delete",
  });
}