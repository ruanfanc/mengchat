import { requests } from "./requests";

export const reqPriInfo = <T>(data: { fromname: string, toname: string }) => requests<T>({ url: `/chat/priInfo`, data, method: "POST" })

export const reqChangeRead = <T>(data: { fromname: string, toname: string }) => requests<T>({ url: `/chat/changeRead`, data, method: "POST" }) 