const async = require('hbs/lib/async');

plist = require('../database/productlist');

module.exports = {

  noteBookTotal: async function () {
    let noteBook = await plist.find({ name: "NoteBook" });
    let discount = false;
    let discountPrice = 0;
    let finalPrice = 0;
    let totalPrice = 0;
    let bookQty = [0, 0];

    noteBook.forEach((i) => {
      bookQty.push(i.qty);
    });

    let totalQty = bookQty.reduce((a, b) => a + b, 0);
    //console.log(totalQty);
    totalPrice = totalQty * 100;

    if (totalPrice >= 500) {
      discount = true;
      discountPrice = ((totalPrice * 10) / 100);

      if (discountPrice > 60) {
        discountPrice = 60;

      }

    }

    finalPrice = totalPrice - discountPrice;


    return [finalPrice, discountPrice, totalQty, totalPrice];

  },

  sanitizerTotal: async function () {
    let sanitizer = await plist.find({ name: "sanitizer" });
    let finalPrice = 0;
    let discountPrice = 0;
    let sanQty = [0, 0];

    sanitizer.forEach((i) => {
      sanQty.push(i.qty);
    });
    let totalQty = sanQty.reduce((a, b) => a + b, 0);
    //console.log(totalQty);
    let totalPrice = totalQty * 250;
    if (totalPrice > 3000) {
      discountPrice = 100;
    }
    finalPrice = totalPrice - discountPrice;
    return [finalPrice, discountPrice, totalQty, totalPrice];

  },

  bagTotal: async function () {
    let bag = await plist.find({ name: "bag" });

    let bagQty = [0, 0];

    bag.forEach((i) => {
      bagQty.push(i.qty);
    });
    totalQty = bagQty.reduce((a, b) => a + b, 0);
    //  console.log(totalQty);
    let finalPrice = totalQty * 1500;

    return [finalPrice, totalQty];
  },

  totalAmount: async function (noteFinal, sanFinal, bagFinal) {

    return total = noteFinal + sanFinal + bagFinal;

  }
}