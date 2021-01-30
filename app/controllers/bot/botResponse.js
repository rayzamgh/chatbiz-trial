const fetch = require('node-fetch');
const twilio = require('twilio');

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const { getResp } = require('../../utils/botDictionary');

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */

class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */

  static async botRoute(req, res, next) {
    const twimlmr = new MessagingResponse();
    const message = req.body.Body;

    res.set('Content-Type', 'text/xml');

    switch (message) {
      case 'json':
        WhatsappBot.jsonResponse(req, res, next);
        break;
      case 'meme':
        WhatsappBot.imageResponse(req, res, next);
        break;
      default:
        twimlmr.message(getResp(message));
        return res.status(200).send(twimlmr.toString());
    }

    return null;
  }

  static async botResponse(req, res, next) {
    const twimlmr = new MessagingResponse();

    try {
      let result;

      await fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((resp) => resp.json())
        .then((json) => { result = json; });

      console.log(result);

      twimlmr.message(result.title);

      return res.status(200).send(twimlmr.toString());
    } catch (error) {
      return next(error);
    }
  }

  static async jsonResponse(req, res, next) {
    const twimlmr = new MessagingResponse();

    try {
      let result;

      await fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((resp) => resp.json())
        .then((json) => { result = json; });

      console.log(result);

      twimlmr.message(result.title);

      return res.status(200).send(twimlmr.toString());
    } catch (error) {
      return next(error);
    }
  }

  static async imageResponse(req, res, next) {
    const twimlmr = new MessagingResponse();
    let result;

    try {
      const message = twimlmr.message();

      await fetch('https://meme-api.herokuapp.com/gimme/dankmemes')
        .then((resp) => resp.json())
        .then((json) => { result = json; });

      message.body('Today`s reddit special:');
      message.media(result.url);

      console.log(twimlmr.toString());

      if (!result.nsfw) {
        return res.status(200).send(twimlmr.toString());
      }
      throw Error;
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = WhatsappBot;
