// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {

  var param = req.params.date;
  if (!isNaN(param)) {
    param = parseInt(param);
  }
  var date = new Date(param);
  var unixTimeStamp = date.valueOf();
  var utcString = date.toUTCString();
  if (isNaN(unixTimeStamp)) {
    return res.json({error : "Invalid Date"});
  }
  return res.json({"unix" : unixTimeStamp, "utc": utcString});
})

app.get("/api/", function (req, res) {

  var currentDate = new Date();
  var unixTimeStamp =  currentDate.valueOf();
  var utcString = currentDate.toUTCString();
  return res.json({"unix" : unixTimeStamp, "utc": utcString});

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
