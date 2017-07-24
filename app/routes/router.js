var express = require('express');
var logger = require('./logger');
var router = express.Router();
var User = require('../models/user');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});


//POST route for updating data
router.post('/register', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
      logger.log('info', 'Everything started properly.');
      logger.log('warn', 'Running out of memory...');
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      activated: false,
      regoNumber: req.body.regoNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      licenseNumber: req.body.licenseNumber,
      dateOfBirth: req.body.dateOfBirth,
      customVehicleName: req.body.customVehicleName,
      mobileNumber: req.body.mobileNumber

    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/send');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }

      else {
          req.session.userId = user._id;
          if(user.activated == true)
           return res.redirect('/profile');
           else {
             var err = new Error('User not activated yet. Please check your e-mail for verification link');
             err.status = 402;
             return next(err);
           }
      }
    });
  } else {
    var err = new Error('All fields required for reg');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/register');
      }
    });
  }
});

router.get('/send',function(req,res){
var mailer = require("nodemailer");
// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
       service: 'Gmail',
       auth: {
           user: 'imperialdigital02@gmail.com', // Your email id
           pass: 'Imperial01!!' // Your password
       }
   });
   rand=Math.floor((Math.random() * 100) + 54);
       host=req.get('host');
       link="http://"+req.get('host')+"/verify?id="+rand;
       mailOptions={
           from: 'imperialdigital02@gmail.com', // sender address
           to : "aisha@imperialdigital.co.nz",//req.query.to,
           subject : "Please confirm your Email account",
           html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
       }
       console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
  if(error){
          console.log(error);
          res.end("error");
       }else{
          console.log("Message sent: " + response.message);
          res.end("Verification email has been sent. Please check your e-mail for verification link");
           }
  smtpTransport.close();
});
});

router.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified</h1>");
        //modify user
        // find the user
        // update him to activated
        User.findOneAndUpdate({ email: mailOptions.to }, { activated: true }, function(err, user) {
          if (err) throw err;
          // we have the updated user returned to us
          console.log(user);
           });
              //
          }
          else
          {
              console.log("email is not verified");
              res.end("<h1>Bad Request</h1>");
          }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});

module.exports = router;
