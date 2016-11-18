// fs-data-management-lib.js
var fs = require('fs');

// **** Users' properties persistence management lib based on files **** //
var configFolder = './prefs';


module.exports = {
  // Get user config
  get: function (fromId, key, nonevalue, callback) {
    fs.readFile(configFolder+'/'+fromId+'.json', function(err, data){
      reterr = null;
      retval = null;
      if(!err) {
        console.log('Read data OK: ["' + key + '"="' + data + '"]');
        retval = JSON.parse(data)[key];
      }
      else if(err.code == 'ENOENT') {
          console.log('Read data NOFILE: ["' + key + '"], reverting to "'+ nonevalue +'"');
          retval = nonevalue;
      }
      else {
        console.log('Read data ERROR: '+err);
        reterr = err;
      }
      callback(reterr, retval);
    });
  },
  // Update user config
  update: function (fromId, key, newvalue, callback) {
    fs.readFile(configFolder+'/'+fromId+'.json', function(err, data){
        var props = {};
        if(!err) {
          props = JSON.parse(data);
        }
        else {
            console.log('Update read error: '+err);
        }

        props[key] = newvalue;
        
        fs.writeFile(configFolder+'/'+fromId+'.json', JSON.stringify(props), function(err) {
            if(err) {
                console.log('Update error: '+err);
                callback(err);
            }
            else {
              console.log("The prefs were updated ["+key+"="+newvalue+"]!");
              callback(null);
          }
        });
      });
  },
  // Reset user config
  reset: function(fromId, callback) {
    fs.unlink(configFolder+'/'+fromId+'.json', function(err) {
      if (err) {
        console.log('Prefs reset failed: ' + err);
      }
      callback(err);
    });
  }
};
