const express = require('express');
const CONFIG = require('../config');
const fetch = require('node-fetch');
// const coinController = require('./controllers/coinControllers');

const app = express();
const PORT = CONFIG.PORT;
const TODAY = CONFIG.COINDESK.URI_ADDRESSES.TODAY_USD;
const PREV = CONFIG.COINDESK.URI_ADDRESSES.PREV_USD;
const SUCCESS = CONFIG.STATUS_CODES.SUCCESS;
const USER_ERROR = CONFIG.STATUS_CODES.USER_ERROR;

app.get('/compare', (req, res) => {
  fetch(TODAY)
  .then(res => res.json())
	.then(json => {
    const { code, symbol, rate_float, } = json.bpi.USD;
    console.log(json)
    const price = precisionRound(rate_float, 2)
    console.log('price: ', rate_float)
    fetch(PREV)
      .then(res => res.json())
      .then(json2 => {
        console.log('yesterday ', json2);
        const prevPrice = json2.bpi[Object.keys(json2.bpi)[0]]
        const price2 = precisionRound(prevPrice, 2) 
        console.log('today ', json)
        return res.send('Today\'s BitCoin rate is $' + price + ' ' + code + '\n' +
        'Yesterday\'s BitCoin rate was $' + price2 + ' ' + code
        );
    })
  });
})

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
    
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});