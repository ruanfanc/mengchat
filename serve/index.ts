import { Session } from "express-session";
declare module "http" {
    interface IncomingMessage {
        session: Session & {
            authenticated: boolean
        }
    }
}


import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './router/user';
import chatRouter from './router/chat';
import http from 'http';
import { Server } from "socket.io";


const app = express()
var session = require('express-session')
export const server = http.createServer(app);
export default Server
export const sessionMiddleware = session({
    secret: 'changeit',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: false,
    }
})

const cors = require('cors')
import path from "path";

// 配置请求体
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(sessionMiddleware)// 配置session中间件
app.use(cors())
app.use('/user', userRouter)
app.use('/chat', chatRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use((req: any, res, next) => {
//     const { url, session: { user } } = req;
//     if (url.indexOf('/login') > -1 || url.indexOf('register') > -1) {
//         next()
//     } else {
//         if (user) {
//             next()
//         } else {
//             res.send({
//                 code: 403,
//                 message: '请重新登录'
//             })
//         }
//     }
// })
import './socket/index';//引入socket
server.listen(4000, () => {
})

