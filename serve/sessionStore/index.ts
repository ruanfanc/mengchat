import { session } from "../model/socket";

class SessionStore {
    // 创建一个Map对象存储姓名和socketId
    sessions: Map<string, session>
    constructor() {
        this.sessions = new Map<string, session>();
    }
    // 返回socketid
    findSession(name: string): string | undefined {
        return this.sessions.get(name)?.id;
    }
    // 保存socketid
    saveSession(name: string, sessionId: string): void {
        this.sessions.set(name, { id: sessionId });
    }
    // 删除sessions
    deleteSession(name: string): void {
        this.sessions.delete(name);
    }
    // 保存chatName  
    saveChatName(userName: string, chatName: string): void {
        let session = this.sessions.get(userName)!
        this.sessions.set(userName, { ...session, chatName })
    }
    // 返回chatName  
    findchatName(userName: string): string | undefined {
        return this.sessions.get(userName)?.chatName;
    }
}

export default new SessionStore();