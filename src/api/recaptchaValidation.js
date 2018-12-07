const app = require('../server.js')
const request = require('request')
const util = require('util')

app.get('/api/validate/recaptcha', async (req, res) => {
  let result
  const captchaResponse = req.body['response'];
  const secretKey = null;

  try {
    result = await util.promisify(request.get)('https://www.google.com/recaptcha/api/siteverify?secret='+ secretKey + '&response=' + captchaResponse);
  } catch(e) {
    console.log(e);
  }

  return res.send({
    "success": result.success
  })
})