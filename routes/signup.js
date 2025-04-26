
var express = require('express');
var router = express.Router();
var connectToDB = require('../configuration/db');

router.post('/', async (req, res) => {
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
      res.render('login',{cssFile: '/stylesheets/style_login.css'})
    } catch (err) {
      console.error('Error inserting user:', err);
      res.status(500).send('Something went wrong.');
    }
  });

module.exports = router;