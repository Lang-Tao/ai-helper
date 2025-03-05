import request from "@/utils/request";

//新建任务
export function createTask(data) {
    return request({
        url: `/task`,
        method: "post",
        data: data,
    });
}

// 获取任务列表
export function getTaskList() {
    return request({
        url: `/task`,
        method: "get",
    });
}

// 获取项目及成员
export function getTaskMember() {
    return request({
        url: `/task/getTeam`,
        method: "get",
    });
}
