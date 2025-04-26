var express = require('express');
var router = express.Router();
var connectToDB = require('../configuration/db');

// GET home page.

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' , cssFile: '/stylesheets/style_login.css'});
});

// GET admin page.

router.get('/admin_login', function(req, res, next) {
  res.render('admin_login', { title: 'admin' , cssFile: '/stylesheets/style_login.css'});
});


// user login Creditinals checking

router.post('/submit', async (req, res) => {
  try {
    const db = await connectToDB();

    const userData = {
      email: req.body.email,
      password: req.body.password
    };

     if( await db.collection('users').findOne(userData)){
      req.session.user = req.body.email
      res.redirect('/users')
     }else{
      req.session.passwordwrong = true
      res.redirect('/users')
     }
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Something went wrong.');
  }
});

// User add from admin dashboard

router.post('/addUser', async (req, res) => {
  try {
      console.log(req.body)
    const db = await connectToDB();
    console.log(req.body)

    const userData = {
      name: req.body.full_name,
      email: req.body.email,
      password: req.body.password
    };

    await db.collection('users').insertOne(userData);
    res.redirect('/admin_user')
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Something went wrong.');
  }
});


// delete user from dashboard

router.post('/delete', async (req, res) => {
  
  try {
    const db = await connectToDB();

    const Data = {
      email: req.body.email
    };

    await db.collection('users').deleteOne(Data);
    res.redirect('/admin_user')
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Something went wrong.');
  }
});

// edit user data from dashboard

router.post('/edit', async (req, res) => {
  
  try {
    const db = await connectToDB();

    const EditData = {
      name: req.body.name,
      password:req.body.password
    };

    const keyData = {
      email:req.body.email
    }

    await db.collection('users').updateOne(keyData, { $set: EditData });
    res.redirect('/admin_user')
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Something went wrong.');
  }

});

// Search Data from dashboard

router.post('/search', async (req, res) => {

  try {
    const db = await connectToDB();
    const data = req.body.name
    const users = await db.collection('users').find({name: { $regex: '^'+data, $options: 'i' }}).toArray()
    res.render('admin_dashboard', {users, cssFile: '/stylesheets/style_dashboard.css'})
    
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Something went wrong.');
  }
  
});


// Logout and return to login page

router.get('/logout', function (req, res, next) {

  req.session.destroy();
  res.clearCookie('connect.sid');
  res.render('login', {cssFile: '/stylesheets/style_login.css'})

});

// Logout admin and return to admin login page

router.get('/logout_admin', function (req, res, next) {

  req.session.destroy();
  res.clearCookie('connect.sid');
  res.render('admin_login', {cssFile: '/stylesheets/style_login.css'})

});


// Get Signup page

router.get('/index', function(req, res, next) {

    res.render('index', { title: 'SignUp', cssFile: '/stylesheets/style.css', jsFile: '/javascripts/validate.js'});
});


module.exports = router;
