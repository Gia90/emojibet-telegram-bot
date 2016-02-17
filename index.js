/*********************************
 *  @Emojibet TelegramBot
 *  Telegram bot to convert your messages using Emoji alphabet
 *********************************/
var TelegramBot = require('node-telegram-bot-api');
/* Users' configuration management lib
 * MUST implement:
 *  - get(fromId, key, callback)
 *  - put(fromId, key, newvalue, callback)
 *  - reset(fromId, callback)
 */
var config = require('./fs-config-management-lib');


// **** BOT Configuration **** //
var token = 'xxx';
// *************************** //

// Create polling BOT
var bot = new TelegramBot(token, {polling: true});


console.log('Telegram emojibet BOT is alive!');
