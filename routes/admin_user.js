var express = require('express');
var router = express.Router();
var connectToDB = require('../configuration/db');

// Call admin dashboard and print users

router.get('/', async function (req, res, next) {

  let users
  try {
    const db = await connectToDB();

     users =  await db.collection('users').find().toArray()

     console.log(users)

    
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Something went wrong.');
  }


  if (req.session.user) {
    res.render('admin_dashboard', {users, cssFile: '/stylesheets/style_dashboard.css'})
  } else {
    if (req.session.passwordwrong) {
      res.render('admin_login', { message: 'invalid Username or Password', cssFile: '/stylesheets/style_login.css' })
      req.session.passwordwrong = false
    } else {
      res.render('admin_login', {cssFile: '/stylesheets/style_login.css'})
    }
  }
});






module.exports = router;