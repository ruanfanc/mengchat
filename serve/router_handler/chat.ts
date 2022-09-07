import { Request, Response } from 'express'
import { db } from '../mysql'
import { MysqlError } from 'mysql';

export const getPrivateInformation = (req: Request, res: Response) => {
    let sql = `select * from information where fromname ='${req.body.fromname}' and toname= '${req.body.toname}' or  fromname ='${req.body.toname}' and toname= '${req.body.fromname}' `
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                status: 422,
                data: { message: err.message }
            })
        } else {
            res.status(200).send({
                status: 200,
                data: { informations: result }
            })
        }
    })
}

export const changeFriendRead = (req: Request, res: Response) => {
    let sql = `update friends set ? where user ='${req.body.fromname}' and friend = '${req.body.toname}'`

    db.query(sql, { isread: 1 }, (err, result) => {
        if (err) {
            res.send({
                status: 422,
                data: { message: err.message }
            })
        } else {
            res.status(200).send({
                status: 200,
                data: { message: '成功设置已读' }
            })
        }
    })

}

