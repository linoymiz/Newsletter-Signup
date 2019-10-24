var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000...");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/fcdc5483df",
    method: "POST",
    headers: {
      "Authorization": "linoymi d54649925ad332d441d22cb47e7b7cdf-us20"
    },
    body: jsonData
  };
  request(options, function(error, response, body) {
    if (error)
      res.sendFile(__dirname + "/failure.html");
    else {
      if (response.statusCode == 200)
        res.sendFile(__dirname + "/success.html");
      else
        res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

//API key
//d54649925ad332d441d22cb47e7b7cdf-us20

//list id
//fcdc5483df
