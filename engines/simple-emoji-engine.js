module.exports = {
  // Convert
  convert: function(text, callback) {
    var convertedText = "";
    var upperText = text.toUpperCase();
    for (var i = 0; i < upperText.length; i++)
    {
        convertedText += conversionAsciiMap[upperText.charCodeAt(i) - firstAsciiValue];
    }
    callback(null, convertedText);
  }
};

// Ascii value of the first uppercase letter used as offset, corresponding to index 0 in conversionAsciiMap
var firstAsciiValue = "A".charCodeAt(0);

/* Map to replace single char with single similarly shaped emoji
 *    "A"-"Z" = 65 - 90
 */
var conversionAsciiMap = [
  "\u{1F170}",
  "\u{1F171}",
  "\u{00A9}",
  "\u{21A9}",
  "\u{1F4E7}",
  "\u{1F38F}",
  "\u{26FD}",
  "\u{2653}",
  "\u{2139}",
  "\u{1F5FE}",
  "\u{1F38B}",
  "\u{1F462}",
  "\u{24C2}",
  "\u{2651}",
  "\u{2B55}",
  "\u{1F17F}",
  "\u{264C}",
  "\u{26A1}",
  "\u{1F334}",
  "\u{26CE}",
  "\u{2648}",
  "\u{1F4C8}",
  "\u{274C}",
  "\u{270C}",
  "\u{24CF}"
];
