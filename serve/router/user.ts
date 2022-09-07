import { register, login, ifLogin, logout, directLogin, friends } from '../router_handler/user';
const express = require('express');
const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/ifLogin', ifLogin)
userRouter.post('/directLogin', directLogin)
userRouter.post('/logout', logout)
userRouter.post('/friends', friends)


export default userRouter 