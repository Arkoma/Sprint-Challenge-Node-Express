module.exports = {
  PORT: 3000,
  COINDESK: {
    URI_ADDRESSES: {
      TODAY_USD: 'https://api.coindesk.com/v1/bpi/currentprice.json',
      PREV_USD: 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday'
    }
  },
  STATUS_CODES : {
    SUCCESS: 200,
    USER_ERROR: 422,
  }
}