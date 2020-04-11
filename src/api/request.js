import axios from "axios"

axios.defaults.baseURL = "http://39.101.203.68:8082/ws";
// axios.defaults.baseURL = "http://10.0.5.127:8082/ws";

// axios.defaults.baseURL = "/api";
axios.defaults.timeout = 1000 * 500;//设置请求超时

let cacheRequestList = []; //声明一个数组用于存储每个请求
let cancelToken = axios.CancelToken;
let removePending = (request) => {
    let _uuid = createUuid(request);
    for (let index in cacheRequestList) {
        if (cacheRequestList[index].uuid === _uuid) { //当前请求在数组中存在时执行函数体
            cacheRequestList[index].cancel(); //执行取消操作
            cacheRequestList.splice(index, 1); //把这条记录从数组中移除
        }
    }
};

/**
 * 根据请求生成UUID
 * @param request
 * @returns {string}
 */
function createUuid(request) {
    return request.url + '&' + request.method
}

axios.interceptors.request.use(
    request => {
        // removePending(request); //在一个发送前执行一下取消操作
        // request.cancelToken = new cancelToken((c) => {
        //     // 这里的标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        //     cacheRequestList.push({uuid: createUuid(request), cancel: c});
        // });
        return request;
    },
    error => {
        return Promise.reject(error)
    }
);

axios.interceptors.response.use(
    response => {
        if (!response.data.status) {
            window.console.log(response.data,'response.dataresponse.data')
        }
        return response.data
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    sessionStorage.clear()
                    location.replace("/login");
                    break;
            }
        }
        return Promise.reject(error)
    }
);

export default axios