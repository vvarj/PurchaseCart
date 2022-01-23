const express = require('express');
const router = express.Router();
const pList = require('../database/productlist');

router.get('/', (req, res) => {

    res.render('home');
  })

  router.post('/', async(req, res) => {
    console.log(req.body);
    let item =await new pList(req.body);
    console.log(item._id);
    await item.save();
    res.redirect('/');
  })



  module.exports =router;