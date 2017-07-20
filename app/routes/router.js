var express = require('express');
var router = express.Router();
var User = require('../models/user');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
// var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
// var transport = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             type: 'OAuth2',
//             user: "imperialdigital02@gmail.com",
//             pass: "Imperial01!!"
//
// // var smtpTransport = nodemailer.createTransport("SMTP",{
// //     service: "Gmail",
// //     auth: {
// //         user: "imperialdigital02@gmail.com",
// //         pass: "Imperial01!!"
//     }
// });
// var rand,mailOptions,host,link;


// var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
//
// var transporter = nodemailer.createTransport(smtpTransport({
//    host: 'smtp.gmail.com',
//    port: '465',
//    secure: true,
//    auth: {
//        user: 'imperialdigital02@gmail.com',
//        pass: 'Imperial01!!'
//    }
// }));
/*------------------SMTP Over-----------------------------*/


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
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

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;

        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
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
        return res.redirect('/');
      }
    });
  }
});

router.get('/send',function(req,res){
//         rand=Math.floor((Math.random() * 100) + 54);
//     host=req.get('host');
//     link="http://"+req.get('host')+"/verify?id="+rand;
//     mailOptions={
//         from: 'imperialdigital02@gmail.com', // sender address
//         to : "aisha@imperialdigital.co.nz",//req.query.to,
//         subject : "Please confirm your Email account",
//         html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
//     }
//     console.log(mailOptions);
//     transporter.sendMail(mailOptions, function(error, response){
//      if(error){
//             console.log(error);
//         res.end("error");
//      }else{
//             console.log("Message sent: " + response.message);
//         res.end("sent");
//          }
// });
var mailer = require("nodemailer");

// Use Smtp Protocol to send Email

var smtpTransport = mailer.createTransport({
       service: 'Gmail',
       auth: {
           user: 'imperialdigital02@gmail.com', // Your email id
           pass: 'Imperial01!!' // Your password
       }
   });
// var smtpTransport = mailer.createTransport("SMTP",{
//     service: "Gmail",
//     auth: {
//         user: "imperialdigital02@gmail.com",
//         pass: "Imperial01!!"
//     }
// });

var mail = {
    from: "imperial <imperialdigital02@gmail.com>",
    to: "aisha@imperialdigital.co.nz",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
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
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
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
