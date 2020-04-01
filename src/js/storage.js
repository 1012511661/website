/*
* @Author: yongwenhao
* @Date: 2020-03-20 14:52:56
* @describe: sessionStorage 存储
*/
let keys = {
    TOKEN: "token",
    ADMIN:'admin'
};
export const TOKEN = {
    getValue: () => sessionStorage.getItem(keys.TOKEN),
    set: function (value) {
        sessionStorage.setItem(keys.TOKEN, value)
    },
    clean: function () {
        sessionStorage.removeItem(keys.TOKEN)
    }
};