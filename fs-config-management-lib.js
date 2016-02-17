// fs-data-management-lib.js
var fs = require('fs');

// **** Reports Data Management Configuration **** //
var configFolder = './config';


module.exports = {
  // Get user config
  get: function (fromId, key, callback) {
    fs.readFile(configFolder+'/_'+fromId+'.json', function(err,data){
      var curState = 0;
      if(!err) {
        console.log('Read data OK: ' + data);
        curState = JSON.parse(data).current;
      }
      else if(err.code == 'ENOENT') {
          console.log('Read data NOFILE: report state = 0');
          curState = 0;
      }
      else {
        console.log('Read data ERROR: '+err);
        curState = -1;
      }
      callback(null, curState);
    });
  },
  // Put user config
  put: function (fromId, key, newvalue, callback) {
    fs.readFile(configFolder+'/_'+fromId+'.json', function(err,content){
        var report = {"current": 0};
        if(!err) {
          console.log('Update read data: ' + content);
          report = JSON.parse(content);
        }
        else {
            console.log('Update read error: '+err);
        }

        report[state] = data;
        report.current = state;

        fs.writeFile(configFolder+'/_'+fromId+'.json', JSON.stringify(report), function(err) {
            if(err) {
                console.log('Update error: '+err);
                callback(err);
            }
            else {
              console.log("The report was updated ["+state+"="+data+"]!");
              callback(null);
          }
        });
      });
  },
  // Reset user config
  reset: function(fromId, callback) {
    fs.unlink(configFolder+'/_'+fromId+'.json', function(err) {
      if (err) {
        console.log('Config reset failed: ' + err);
      }
      callback(err);
    });
  }
};
