/*
 * Available converting engines list
 */
var engines = {};
// Simple emoji engine
engines["simpleEmoji"] = require('./libs/engines/simple-emoji-engine');

// UGLY DIRTY TESTS

var text = "ciao donato io ti amo da morire";

engines["simpleEmoji"].convert(text, function(err, out) { console.log("\u{20E3} Converted \""+text+"\": "+out+""); } );
