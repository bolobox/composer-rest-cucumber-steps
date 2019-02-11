const Swagger = require('swagger-client');
const fs = require('fs');
const path = require("path");


var coldClient = Swagger({
    url: process.env.swaggerSpec,
    requestInterceptor: function(req) {
        if (process.env.shoganaiApiKey) {
            req.headers["X-Api-Key"] = process.env.shoganaiApiKey;
        }
    }
});

var hlclient = {
    bgWriteStream: null,
    scWriteStream: null,
    initialize: function(feature) {
      var dir = process.env.SCRIPT_DIR+"/"+path.basename(feature).replace('.feature', '');

      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      if (fs.existsSync(dir+"/background.sh")) {
        fs.unlinkSync(dir+"/background.sh");
      }
      if (fs.existsSync(dir+"/scenario.sh")) {
        fs.unlinkSync(dir+"/scenario.sh");
      }

      hlclient.bgWriteStream = fs.createWriteStream(dir+"/background.sh");
      hlclient.scWriteStream = fs.createWriteStream(dir+"/scenario.sh");

    },
    createResource2: function(resource, name, idfield, idvalue) {
      return new Promise(function(resolve, reject) {
        coldClient.then(
          function(client) {
            setTimeout(function() {
              client.apis[name][name+'_create']({
                  "data": resource
              }).then(
                  function(result) {
                      if (result.status == 200) {
                          resolve(result.body);
                      } else {
                          console.log("ERROR 1 ", result.body);
                          reject(result.body);
                      }
                  },
                  function (error) {
                      console.log("ERROR 2", error);
                      resolve();
                      // reject(error);
                  }
              );
            }, 2000);

          },
          function(error) {
              console.log("ERROR 3", error);
              reject(error);
          }
        );

      });
    },
    createResource: function(resource, name, idfield, idvalue) {
      return new Promise(function(resolve, reject) {
        var json_str = JSON.stringify(resource).replace(/\\n/g, '');

        var curl = 'echo "Creating '+name+' '+idvalue+'"\n';
        curl = curl + 'curl -X POST --header \'Content-Type: application/json\' --header \'X-Api-Key: '+process.env.shoganaiApiKey+'\'  -d \''+json_str+'\' '+process.env.swaggerSpec.replace('/explorer/swagger.json', '')+'/api/' + name + '\n';
        curl = curl + 'echo ""\n';
        curl = curl + 'echo "---------------------------------------"\n';
        hlclient.bgWriteStream.write(curl, function(error){
          if (error) {
            reject(error);
          }
          else {
            resolve();
          }
        });
      });
    },
    createTransaction: function(resource, name) {
      return new Promise(function(resolve, reject) {
        delete resource.transactionId;
        var json_str = JSON.stringify(resource).replace(/\\n/g, '');

        var curl = 'echo "Creating transaction '+name+' "\n';
        curl = curl + 'curl -X POST --header \'Content-Type: application/json\' --header \'X-Api-Key: '+process.env.shoganaiApiKey+'\'  -d \''+json_str+'\' http://hldev.westeurope.cloudapp.azure.com:3000/api/' + name + '\n';
        curl = curl + 'echo ""\n';
        curl = curl + 'echo "---------------------------------------"\n';
        hlclient.scWriteStream.write(curl, function(error){
          if (error) {
            reject(error);
          }
          else {
            resolve();
          }
        });
      });
    }
}

module.exports = hlclient;
