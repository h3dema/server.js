//
//
// load modules
//
//
var express = require('express');
var app = express();
const fs = require('fs');
const utils = require('./scripts/utils.js');

var os = require('os');
var interfaces = os.networkInterfaces();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//
// program parameters
//
//
const port = 58080;               // server listen to port
const filename = '/tmp/save.db'; // filename (log) where data will be written
const verbose = false;           // if verbose=true, print results to the console
const get_local_ip = true;       // if should insert the local interface data in the log



app.get('/', function(request, response){
  response.send('Use POST to send data to the server');
});


function addInterfaces() {
  var data = ""
  Object.keys(interfaces).forEach(function (ifname) {
    var alias = 0;
    interfaces[ifname].forEach(function (iface) {
      // skip internal interface (loopback) and non IP version 4
      if ('IPv4' != iface.family || iface.internal == true) {
        return;
      }
      // this single interface has multiple ipv4 addresses
      if (alias >= 1) {
        // console.log(ifname + ':' + alias, iface.address);
        data = data + ";" + ifname + "[" + alias +"]:" + iface.address;
      } else {
        // console.log(ifname, iface.address); 
        // this interface has only one ipv4 adress
        data = data + ";" + ifname + ":" + iface.address;
      }
      ++alias;
    });
  });
  if (data.length > 0) {
    data = data.substr(1);  // remove first ";"
  }
  return data;
}

// servidor para receber o post em 8080
app.post('/', function(request, response){

  // timestamp
  const date = new Date().toJSON().slice(0, 19).replace(/[-T]/g, ':'); // gera data como YYYY:MM:DD:HH:MM:SS

  // dados do cliente
  v = utils.decodeRequest(request);


  var data = request.body;
  data['client'] = v[0];
  data['proxy'] = v[1];
  data['client-agent'] = v[2];
  data['timestamp'] = date;
  data['iface'] = "";
  if (get_local_ip) {
    data['iface'] = addInterfaces();
  }
  utils.append(filename, JSON.stringify(data), sep='\n');


  console.log(request.body);

  if (verbose) {
    console.log(request.body);
    console.log(request);
    console.log("timestamp: "+date)

    console.log("cliente: "+v)

    console.log("bufferLevel      :" + request.body.bufferLevel);
    console.log("reportedBitrate  :" + request.body.reportedBitrate);
    console.log("calculatedBitrate:" + request.body.calculatedBitrate);
    console.log("droppedFPS       :" + request.body.droppedFPS);
    console.log("index            :" + request.body.index);
    console.log("maxIndex         :" + request.body.maxIndex);
    console.log("latency          :" + request.body.latency);
    console.log("download         :" + request.body.download);
    console.log("video_ratio      :" + request.body.video_ratio);
    console.log("iface            :" + data['iface']);
    console.log("playing          :" + request.body.playing);
  };

  // ---------------------------------------------------------
  // The following lines allow the client to receive the server's response
  // Website you wish to allow to connect
  response.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  response.setHeader('Access-Control-Allow-Credentials', true);
  // ---------------------------------------------------------

  // response.send(JSON.stringify({status:'ok', data: data}));
  response.send(JSON.stringify({status:'ok'}));
});

console.log('Starting server @'+port)
app.listen(port)
