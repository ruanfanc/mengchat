import { getPrivateInformation, changeFriendRead } from '../router_handler/chat';
const express = require('express');
const chatRouter = express.Router()


chatRouter.post('/priInfo', getPrivateInformation)
chatRouter.post('/changeRead', changeFriendRead)


export default chatRouter
