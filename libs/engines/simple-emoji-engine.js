module.exports = {
  // Reset user config
  convert: function(text, callback) {
    var convertedText = "";
    var upperText = text.toUpperCase();
    for (var i = 0; i < upperText.length; i++)
    {
        convertedText += conversionAsciiMap[upperText.charCodeAt(i) - 32];
    }
    callback(null, convertedText);
  }
};

/* Map to replace single char with single similarly shaped emoji
 *    "A"-"Z" = 65 - 90
 */
var conversionAsciiMap = [
  " ",
  "\u{2757}",
  "\"",
  "#\u{20E3}",
  "\u{0001F4B2}",
  "%",
  "\u{0001F675}",
  "'",
  "\u{21AA}",
  "\u{21A9}",
  "*\u{20E3}",
  "\u{2795}",
  ",",
  "\u{2796}",
  ".",
  "/",
  "0\u{20E3}",
  "1\u{20E3}",
  "2\u{20E3}",
  "3\u{20E3}",
  "4\u{20E3}",
  "5\u{20E3}",
  "6\u{20E3}",
  "7\u{20E3}",
  "8\u{20E3}",
  "9\u{20E3}",
  ":",
  ";",
  "\u{25C0}",
  "=",
  "\u{25B6}",
  "\u{2753}",
  "@",
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
  "\u{1F441}\u{200D}\u{1F5E8}",
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
