/*
 * Available converting engines list
 */
var engines = {};
// Simple emoji engine
engines["simpleEmoji"] = require('../libs/engines/simple-emoji-engine');



// UGLY DIRTY TESTS


var start = " ".charCodeAt(0);
var end = "`".charCodeAt(0);
for(var i= start; i<=end; i++)
{
  engines["simpleEmoji"].convert(String.fromCharCode(i), function(err, out) { console.log(String.fromCharCode(i) + " is " + out); } )
}


//var text = "abcdefghilmnopqrst _-?!%&(=^?)\"";
var text = "DONATO TI AMO!";
engines["simpleEmoji"].convert(text, function(err, out) { console.log("\n\n\u{20E3} Converted \""+text+"\": "+out+""); } );
