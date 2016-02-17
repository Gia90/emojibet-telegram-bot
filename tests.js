// Simple emoji engine
var simpleEmoji = require('./engines/simple-emoji-engine');

simpleEmoji.convert("ciao", function(err, a) { console.log(a); } );
