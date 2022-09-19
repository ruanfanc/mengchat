import { register, login, ifLogin, logout, directLogin, friends, avatar, editInfo, friendInfo } from '../router_handler/user';
const express = require('express');
const userRouter = express.Router()
const cors = require('cors')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/ifLogin', ifLogin)
userRouter.post('/directLogin', directLogin)
userRouter.post('/logout', logout)
userRouter.post('/friends', friends)
userRouter.post('/avatar', upload.single('file'), avatar)
userRouter.post('/editInfo', editInfo)
userRouter.post('/friendInfo', friendInfo)


export default userRouter 