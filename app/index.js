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

/*
 * Available converting engines list
 */
var engines = {};
// Simple emoji engine
engines["simpleEmoji"] = require('./engines/simple-emoji-engine');

// **** BOT Configuration **** //
var token = 'xxx';
// *************************** //

// Create polling BOT
var bot = new TelegramBot(token, {polling: true});

// Log any received text
bot.on('text', function (msg) {
  var fromId = msg.from.id;
  console.log('Msg received: ' + JSON.stringify(msg));
});

//
bot.on('text', function (msg) {
  var fromId = msg.from.id;
  var text = msg.text;

  var engineId = config.get("engine");

  engines

  config.get(fromId, "mode", function(err, configValue){
    if(!err)

  });
  bot.sendMessage(fromId, '');

});


console.log('Telegram emojibet BOT is alive!');
