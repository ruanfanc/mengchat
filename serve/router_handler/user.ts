import { friend, userInfo } from '../model/user';
import { Request, Response } from 'express'
import { db } from '../mysql'
import { MysqlError } from 'mysql';
import sessionStore from '../sessionStore'
// 注册
export const register = (req: Request, res: Response) => {
    let name = req.body.name
    let password = req.body.password

    let sql = `select * from user where name = '${name}' `
    let insertUserSql = `insert user set ?`
    db.query(sql, (err: MysqlError, result: userInfo[]) => {
        if (err) {
            return res.status(200).send({
                status: 0, message: err.message
            })
        }
        if (result.length == 0) {
            db.query(insertUserSql, { name, password }, (err, result: userInfo) => {
                if (err) {
                    return res.status(422).send({
                        status: 0, data: { code: 422, message: err.message }
                    })
                } else {
                    res.send({
                        status: 1, data: { code: 200, message: '注册成功', userName: name }
                    })
                }
            })
        } else {
            res.status(422).send({
                status: 0, data: { code: 422, message: '用户名已被注册' }
            })
        }
    })

}
// 登录
export const login = (req: any, res: Response) => {
    let name = req.body.name
    let password = req.body.password
    let sql = `select * from user where name = '${name}' and password = ${password}`
    db.query(sql, (err: MysqlError, result: userInfo[]) => {
        if (err) {
            return res.status(422).send({
                status: 0, message: err.message
            })
        }
        if (result.length == 0) {
            res.status(200).send({
                status: 0, data: { code: 200, message: '该用户不存在', }
            })
        } else {
            req.session.user = req.body.name
            req.session.authenticated = true
            res.status(200).send({
                status: 1, data: { code: 200, message: '登录成功', userName: name }
            })
        }
    })

}
// 直接登录 
export const ifLogin = (req: any, res: Response) => {
    if (req.session.authenticated) {
        res.send({
            status: 1, data: { code: 200, message: '登录成功', userName: req.query.name }
        })
    } else {
        res.send({
            status: 0, message: '未登录'
        })
    }
}
// 用户已登录
export const directLogin = (req: any, res: Response) => {
    req.session.user = req.query.name
    req.session.authenticated = true
    req.session.save()
    res.status(200).send({
        status: 1, data: { code: 200, message: '登录成功', userName: req.query.name }
    })
}
// 退出登录
export const logout = (req: any, res: Response) => {
    sessionStore.deleteSession(req.session.user)
    req.session.destroy()
    res.send({
        status: 200,
        data: { message: '退出登录成功' }
    })
}
// 获取好友列表
export const friends = (req: Request, res: Response) => {
    let sql = `select * from friends where user ='${req.query.name}' `
    db.query(sql, (err: MysqlError, result: friend[]) => {
        if (err) {
            res.send({
                status: 422,
                data: { message: err.message }
            })
        } else {
            // 对结果以时间排序
            result.sort((a, b) => Date.parse(b.time) - Date.parse(a.time))
            res.status(200).send({
                status: 200,
                data: { friends: result }
            })
        }
    })
}