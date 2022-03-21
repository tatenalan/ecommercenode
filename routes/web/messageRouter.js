const express = require('express')
const { Router } = express;

//controllers
const MessageController = require("../../controllers/web/MessageController")
const MessageFactory = require("../../factories/MessageFactory")

// middlewares
const auth = require('../../middlewares/auth').auth;

const messageRouter = Router()

messageRouter.get('/', auth, MessageController.getAll)
messageRouter.get('/messages-test', auth, MessageFactory.createFakers)

module.exports = messageRouter