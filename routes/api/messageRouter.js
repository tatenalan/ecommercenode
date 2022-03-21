const express = require("express")
const { Router } = express;

//controllers
const MessageController = require("../../controllers/api/MessageController")
const MessageFactory = require("../../factories/MessageFactory")

// middlewares
const auth = require('../../middlewares/auth').auth;

const messageRouter = Router()

messageRouter.get('/', auth, MessageController.getMessages)
messageRouter.get('/message-test', auth, MessageFactory.createFakers)
messageRouter.get('/:id', auth, MessageController.getMessage)
messageRouter.post('/', auth, MessageController.insertMessage)
messageRouter.put('/:id', auth, MessageController.updateMessage)
messageRouter.delete('/:id', auth, MessageController.deleteMessage)
messageRouter.delete('/', auth, MessageController.deleteAll)

module.exports = messageRouter