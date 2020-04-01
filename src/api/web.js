import request from "./request"
// 获取菜单列表
export const GetMenuList = params => request.get("/menu", {params: params});
// 获取某一父菜单下的所有子菜单详情
export const GetMenuId = menuId => request.get(`/menu/${menuId}`);
// 查询所有的投票地区
export const GetRegion = params => request.get("/region", {params: params});
// 查询所有投票地区 + 下面的候选人详情
export const GetRegionCan = params => request.get("/region/candidates", {params: params});
// 查询某一地区下所有候选人
export const GetRegionId = regionId => request.get(`/cad/${regionId}`);
// 投票
export const PutVote = params => request.put("/cad/vote", params);
// 修改地区
export const PutVoteUpdate = params => request.put("/region/update", params);
// 新建地区
export const PostVoteUpdate = params => request.post("/region/update", params);
