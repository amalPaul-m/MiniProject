var express = require('express');
var router = express.Router();

const username = 'admin@movie.login'
const password = 'admin@123'



router.post('/', function (req, res, next) {
    console.log(req.body)
    if (req.body.email == username && req.body.password == password) {

        req.session.user = req.body.email
        res.redirect('/admin_user')
    } else {
        req.session.passwordwrong = true
        res.redirect('/admin_user')
    }
});

module.exports = router;