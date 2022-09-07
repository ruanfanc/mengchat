import { io } from "socket.io-client";
import { information } from "../models/chat";
import { getNowTime } from '../utils/time'
import { friend } from '../models/user';
// 封装socket
class Socket {
    socket: any
    // 当前用户姓名
    userName = ''
    // 渲染聊天内容
    setinfos: any
    // 当前聊天对象
    chatName = ''
    // 渲染聊天列表
    setFriends: any

    connect() {
        // 连接socket.io 
        this.socket = io(`http://localhost:4000`);
        // 连接时绑定事件
        this.socket.on('connect', () => {
            this.onPrivateChat()
            this.emitSaveUserName()
        });
        this.userName = localStorage.getItem('name')!
    }
    // 改变聊天对象
    changeChatName(chatName: string) {
        this.chatName = chatName
        this.emitchangeChatName(chatName)
    }
    // 提交保存用户名
    emitSaveUserName() {
        this.socket.emit('saveUserName', this.userName);
    }
    // 提交改变聊天对象
    emitchangeChatName(chatName: string) {
        this.socket.emit('saveChatName', chatName);
    }
    // 接受信息
    onPrivateChat() {
        this.socket.on('privateChat', (info: string, name: string, fromname: string) => {
            // 若当前聊天对象和收到消息的对象相同 则重新渲染聊天内容
            if (this.chatName === fromname) {
                this.setinfos((infos: any) => {
                    infos.push(this.wrapChatInfo(info))
                    return infos.slice()
                })
            }
            let isread = this.chatName === fromname ? 1 : 0
            // 渲染聊天列表
            this.setFriends((friends: friend[]) => {
                for (let i = 0; i < friends.length; i++) {
                    if ((friends[i].friend === fromname)) {
                        friends[i].time = getNowTime()
                        friends[i].lastInfo = info
                        friends[i].isread = isread
                        break
                    }
                }
                return friends.slice()
            })

        })
    }
    // 提交信息
    emitPrivateChat(info: string) {
        this.socket.emit('privateChat', { chatName: this.chatName, info })
    }
    // 包装信息对象
    wrapChatInfo(chatInfo: string): information {
        return {
            fromname: this.chatName,
            toname: this.userName,
            message: chatInfo,
            time: getNowTime()
        }
    }
    // 获取setinfos
    getSetinfos(setinfos: any) {
        this.setinfos = setinfos
    }
    // 获取setfriends
    getSetFriends(setFriends: any) {
        this.setFriends = setFriends
    }
}

export default new Socket()