import { userInfo } from "../models/user";
import { requests } from "./requests";

// 注册
export const reqRegister = <T>(data: userInfo) => requests<T>({ url: "/user/register", data, method: "POST" })
// 登录
export const reqLogin = <T>(data: userInfo) => requests<T>({ url: "/user/login", data, method: "POST" })
// 直接登录
export const reqDirectLogin = <T>(data: string) => requests<T>({ url: `/user/directLogin?name=${data}`, data, method: "POST" })
// 登出
export const reqlogout = () => requests({ url: "/user/logout", method: "POST" })
// 判断是否登录
export const reqIfLogin = () => requests({ url: "/user/ifLogin", method: "POST" })
// 获取好友列表
export const reqFriends = <T>(name: string) => requests<T>({ url: `/user/friends?name=${name}`, method: "POST" }) 
