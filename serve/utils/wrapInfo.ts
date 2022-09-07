import { getNowTime } from "./time";

interface information {
    id?: number;
    fromname: string;
    toname: string;
    message: string;
    time: string;
}

export const wrapChatInfo = (chatName: string, userName: string, chatInfo: string): information => {
    return {
        fromname: chatName,
        toname: userName,
        message: chatInfo,
        time: getNowTime()
    }
}