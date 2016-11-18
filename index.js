/*********************************
 *  @TextArt_bot TelegramBot
 *  Telegram bot to convert your messages using several text conversion engines
 *********************************/

var TelegramBot = require('node-telegram-bot-api');

/* Users' properties persistence management lib
 * MUST implement:
 *  - get(fromId, key, callback)
 *  - put(fromId, key, newvalue, callback)
 *  - reset(fromId, callback)
 */
var userProps = require('./libs/fs-config-management-lib');

/*
 * Available text converting engines list
 */
var engines = {};
// Simple emoji engine
engines["Simple Emoji"] = require('./libs/engines/simple-emoji-engine');

// **** BOT Configuration **** //
var token = require('./bot-token').token;
// *************************** //

// Create polling BOT
var bot = new TelegramBot(token, {polling: true});

/*
SECTIONS (In which section is the user depending on his previous selection)
"":  normal section, send msg to convert
"ENGINE":  engine selection
"RESET":  reset confirmation
*/
// Ask the right question for the specified <section> to <toId>, warning of previous wrong answer if <retry> is true
function askForSection(section, toId, retry) {
  var text = "";
  var opts = {};
  switch(section) {
    case 1:
            text = 'Choose one of the available text conversion engines:';
            enginesKB = [];
            enginesIds = Object.keys(engines);
            for( var i=0; i < enginesIds.length; i++ )
            {
              engineId = (i+1) + ". " + enginesIds[i];
              text+= "\n" + engineId;
              enginesKB.push([engineId]);
            }
            opts = {
              reply_markup: JSON.stringify({
                keyboard: enginesKB,
                one_time_keyboard: true
              })
            };
            break;
    case 2:
            text = 'Please, send me your position \u{1F30D}';
            opts = {
              reply_markup: JSON.stringify({
                hide_keyboard: true
              })
            };
            break;
    default:
            console.log('Invalid section number!');
            break;
  }
  if(retry) {
    opts.parse_mode = "Markdown";
    text = '\u{274C}*Invalid answer!* \n_Follow my instructions:_\n' + text;
    console.log('Invalid answer detected!');
  }
  bot.sendMessage(toId, text, opts);
}




// Log any received text
bot.on('text', function (msg) {
  var fromId = msg.from.id;
  console.log('Msg received: ' + JSON.stringify(msg));
});

//
bot.on('text', function (msg) {
  var fromId = msg.from.id;
  var text = msg.text;

  userProps.get(fromId, "section", 0, function(err, section) {
    // Command received?
    parsedCmd = text.match(/\/([^ ]+)[ ]?(.*)/)
    if( parsedCmd !== null) {
      var cmd = parsedCmd[1];
      var arg = parsedCmd[2];
      switch(cmd) {
        case 'help':
                    console.log('/help handler: '+fromId);
                    bot.sendMessage(fromId, '*@TextArt Bot* converts your messages using several text conversion engines.\n\n'+
                                            '*Available commands:*\n'+
                                            ' /engine - _Choose the conversion engine_\n'+
                                            ' /reset - _Reset your config_\n'+
                                            ' /help - _Display this help message_',
                                            {parse_mode:"Markdown"}
                    );
                    break;
        case 'engine':
                    if(section == 0) {
                      console.log('/engine handler: '+fromId+' '+section);
                      userProps.update(fromId, "section", 1, function(err){} );
                      askForSection(1, fromId);
                    }
                    else {
                      askForSection(1, fromId, true);
                    }
                    break;
        case 'reset':
                    console.log('/reset handler: '+fromId+' '+section);
                    userProps.reset(fromId, function(err) {
                        if(!err) {
                          bot.sendMessage(fromId, '\u{2705} Your configuration has been resetted.');
                        }
                    });
                    break;
        default:
                    console.log('Unrecognized /'+cmd+' command with arg <'+arg+'> from '+fromId+' with section '+section);
                    bot.sendMessage(fromId, 'Unrecognized command. Digit /help to list available commands.');
                    break;
      }
    }
    // Text received
    else {
      switch(section) {
        case 0:
              // Normal state, text conversion
              userProps.get(fromId, "engine", null, function(err, engineID) {
                  engine = (engineID ? engines[engineID] : engines[ Object.keys(engines)[0] ]);
                  engine.convert(text, function(err, out) {
                    console.log("\n\n\u{20E3} Converted \""+text+"\": "+out+"");
                    bot.sendMessage(fromId, out);
                  });
              });
              break;
        case 1:
              // Engine selection
              var matchCategory = text.match(/(^[0-9]*)[. ]*(.*)/);
              if( matchCategory !== null && engines[matchCategory[2]] )
              {
                engineID = matchCategory[2];
                console.log('Engine selected: ' + engineID);
                userProps.update(fromId, "engine", engineID, function(err) { if(!err) userProps.update(fromId, "section", 0, function(err) {}); });
                bot.sendMessage(fromId, "\u{2705} Engine changed to "+engineID+"!", { reply_markup: JSON.stringify({ hide_keyboard: true }) });
              }
              else {
                console.log("Invalid Engine selection! "+matchCategory);
                askForSection(section, fromId, true);
              }
              break;
        case 2:
              // Reset confirmation
              askForSection(section, fromId, true);
              break;
      }
    }
  });
});



console.log('Telegram TextArt BOT is alive!');
