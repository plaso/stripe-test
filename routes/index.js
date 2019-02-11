const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const express = require('express');
const router = express.Router();
const stripe = require("stripe")(keySecret);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/charge', (req, res) => {
  let amount = 500;

  Experience.findById(req.params.id)
    .then(experience => {
      if (experience ) {
        stripe.customers.create({
          email: req.body.stripeEmail,
          source: req.body.stripeToken
        })
        .then(costumer => {
          stripe.charges.create({
            amount: experience.price,
            description: "Buyex: ",
            currency: "eur",
            customer: costumer.id
          })
        })
        .then(charge => {
          new Payment()
          res.redirect('/thank-you-page')
        });
      }
    })

})

module.exports = router;
