const express = require('express');

const botRouter = express.Router();
const WhatsappBot = require('../controllers/bot/botResponse');

botRouter.post('/incoming', WhatsappBot.botRoute);

module.exports = botRouter;
