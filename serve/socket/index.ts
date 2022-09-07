import e, { Request, Response, NextFunction } from "express";
import Server from '../index';
import { server, sessionMiddleware } from '../index';
import { priChat, readType } from "../model/socket";
import { db } from "../mysql";
import sessionStore from '../sessionStore'
import { getNowTime } from "../utils/time";
import { wrapChatInfo } from "../utils/wrapInfo";

// 配置socket跨域
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",//配置跨域
    }
})

// session中间件
io.use((socket, next) => {
    sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction);
});

io.use((socket: any, next) => {
    const session = socket.request.session;
    if (session && session.cookie) {
        next();
    } else {
        next(new Error("没登录"));
    }
});

io.on('connection', (socket: any) => {
    let userName: string
    socket.on('saveUserName', (name: string) => {
        userName = name;
        console.log(`welcome ${name}`)
        sessionStore.saveSession(name, socket.id)
    })
    // 保存chatname
    socket.on('saveChatName', (chatName: string) => {
        sessionStore.saveChatName(userName, chatName)
    })
    // 私人消息
    socket.on('privateChat', (data: { chatName: string, info: string }) => {
        const toId = sessionStore.findSession(data.chatName)
        if (toId) {
            db.query('insert into information set ?', wrapChatInfo(userName, data.chatName, data.info), (err, result) => {
                if (err) {
                    socket.to(socket.id).emit('error', '发送错误')
                } else {
                    let updateSql = `update friends set ? where user ='${userName}'and friend = '${data.chatName}' or user ='${data.chatName}'and friend = '${userName}'`
                    db.query(updateSql, { lastInfo: data.info, time: getNowTime() }, (err, result) => {
                        if (err) {
                            socket.to(socket.id).emit('error', '发送错误')
                        } else {
                            let isread = {
                                isread: sessionStore.findchatName(data.chatName) === userName ? 1 : 0
                            }
                            db.query(`update friends set ? where user ='${data.chatName}' and friend ='${userName}'`, isread, (err, result) => {
                                if (err) {
                                } else {
                                    socket.to(toId).emit('privateChat', data.info, data.chatName, userName)
                                }
                            })
                        }
                    })
                }
            })

        } else {
            db.query('insert into information set ?', wrapChatInfo(userName, data.chatName, data.info), (err, result) => {
                if (err) {
                    socket.to(socket.id).emit('error', '发送错误')
                } else {
                    let updateSql = `update friends set ? where user ='${userName}'and friend = '${data.chatName}' or user ='${data.chatName}'and friend = '${userName}'`
                    db.query(updateSql, { lastInfo: data.info, time: getNowTime() }, (err, result) => {
                        if (err) {
                            socket.to(socket.id).emit('error', '发送错误')
                        } else {
                            db.query(`update friends set isread = 0 where user ='${data.chatName}' and friend ='${userName}'`, (err, result) => {
                                if (err) {
                                }
                            })
                        }
                    })
                }
            })
        }
    })


});     