const express = require('express');
const router = express.Router();
const pList = require('../database/productlist');
const cartCal = require('../helpers/cartCalculation');

router.get('/', async (req, res) => {

  let cartItem = await pList.find();
  console.log(cartItem);
  let [noteFinal, noteDisc, qtynoteBook, tBookPrice] = await cartCal.noteBookTotal();
  let [sanFinal, sanDisc, qtySan, tsanPrice] = await cartCal.sanitizerTotal();
  let [bagFinal, qtyBag] = await cartCal.bagTotal();
  let total = await cartCal.totalAmount(noteFinal, sanFinal, bagFinal);

  res.render('cart', { cartItem, total, noteDisc, qtynoteBook, tBookPrice, noteFinal, sanFinal, sanDisc, qtySan, tsanPrice, qtyBag, bagFinal, cCode: req.session.couponCode, afterCoup: req.session.afterCoupon });
  req.session.couponCode = false;
})

router.post('/', async (req, res) => {

  let recid = req.body.delID;
 
  pList.findByIdAndRemove(recid, async (err, doc) => {
    if (!err) {
      res.redirect('/cart');
    } else {
      res.send('not deleted!!!');
    }
  });
})

router.post('/apply', (req, res) => {
  let CODE = req.body.coupon;
  let tPrice = req.body.price;


  if (CODE === 'PRIME123' && tPrice > 10000) {
    req.session.couponCode = true;
    req.session.afterCoupon = tPrice - 123;
    res.redirect('/cart');
  }
  else {
    res.send('invalid code');
  }


})

module.exports = router;