var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  if (req.session.user) {
    res.render('home',{cssFile: '/stylesheets/style_home.css'})
  } else {
    if (req.session.passwordwrong) {
      res.render('login', { message: 'invalid Username or Password', cssFile: '/stylesheets/style_login.css' })
      req.session.passwordwrong = false
    } else {
      res.render('login', {cssFile: '/stylesheets/style_login.css'})
    }
  }
});


module.exports = router;
