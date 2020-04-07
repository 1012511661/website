import request from "./request"
// 登陆
export const PutUserLogin = params => request.put("/user/login", params);
// 获取菜单列表
export const GetMenuList = params => request.get("/menu", {params});
// 获取某一父菜单下的所有子菜单详情
export const GetMenuId = menuId => request.get(`/menu/${menuId}`);
// 修改菜单（详情，隐藏，或富文本框修改)
export const PutMenuUpdate = params => request.put("/menu/update", params);
// 修改菜单图片
export const PostMenuImport = params => request.post("/menu/import", params);
// 新建菜单下内容详情
export const PostMenuInfo = params => request.post("/menu/info", params);
// 修改菜单下内容详情
export const PutMenuInfo = params => request.put("/menu/info", params);
// 获取某菜单下内容详情列表
export const GetMenuInfo = params => request.get("/menu/info", {params});
// 删除菜单下某菜单内容详情
export const DelMenuInfoId = infoId => request.delete(`/menu/info/${infoId}`);

// 查询所有的投票地区
export const GetRegion = params => request.get("/region", {params});
// 查询所有投票地区 + 下面的候选人详情
export const GetRegionCan = params => request.get("/region/candidates", {params});
// 查询某一地区下所有候选人
export const GetRegionId = regionId => request.get(`/cad/${regionId}`);
// 投票
export const PutVote = params => request.put("/cad/vote", params);
// 修改地区
export const PutVoteUpdate = params => request.put("/region/update", params);
// 新建地区
export const PostVote = params => request.post("/region", params);
// 删除地区
export const DelVote = regionId => request.delete(`/region/${regionId}`);
// 添加候选人
export const PostCad = params => request.post("/cad", params);
// 修改候选人信息
export const PutCad = params => request.put("/cad", params);
// 删除候选人
export const DelCadId = cdId => request.delete(`/cad/${cdId}`);


// 修改公司信息
export const PutCompany = params => request.put("/company", params);
// 获取公司详情信息
export const GetCompany = () => request.get("/company");
// 上传公司logo二维码图片
export const PostCompanyImport = params => request.post("/company/import", params);
