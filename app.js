const express = require('express')
const app = express()
const port = 3000

const https = require('https');
const bodyParser = require("body-parser")
const request = require("request")

// to add our css class live we use the property static
app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});


app.post('/', (req, res) => {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var phone = req.body.phone;
    
    var data ={
      members:[
        {
          email_address: email,
          status: "subscribed",
          merge_fields:{
            FNAME: firstName,
            LNAME: lastName,
            PHONE: phone
          }
        }
      ]
    };

    const jsonData = JSON.stringify(data);

    const url = " https://us21.api.mailchimp.com/3.0/lists/50572ac087";

    const options = {
      method: "POST",
      auth: "stardawg1:ebefba0bf85f1bc6104fbd49f36596e7-us21"
    }

    const request = https.request(url, options, function(response){

      
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    });

    request.write(jsonData);
    request.end();


});

app.post("/failure", function(req, res){
  res.redirect("/")
})
app.post("/success", function(req, res){
  res.redirect("/")
  
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// API key
// ebefba0bf85f1bc6104fbd49f36596e7-us21
// List id
// 50572ac087