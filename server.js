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

app.get("/api",function(req,res){
  let now = new Date();
  res.json({
    "unix" : now.getTime(),
    "utc" : now.toUTCString()
  })
})
app.get("/api/:timestamp",function(req,res){
  let dateString = req.params.timestamp;
  console.log(dateString);
  if(parseInt(dateString)>10000){  // parseInt returns integer value and accepts a string value
    let unixTime = new Date(parseInt(dateString));
    res.json({
      "unix": unixTime.getTime(),
      "utc" : unixTime.toUTCString()
    })
  }
  let passedInValue = new Date(dateString);
  if(passedInValue == "Invalid Date"){
    res.json({"error":"invalid date"});
  }else{
    res.json({
      "unix": passedInValue.getTime(),
      "utc" : passedInValue.toUTCString()
    })
  }
  console.log(req.params);
  
});
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
