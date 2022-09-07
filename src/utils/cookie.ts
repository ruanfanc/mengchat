// 获取cookie的值
// eslint-disable-next-line
export const getCookie = (name: string) => document.cookie.match(`[;\s+]?${name}=([^;]*)`)?.pop();
