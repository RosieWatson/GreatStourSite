const app = require('../server.js')
const request = require('request')
const util = require('util')

app.post('/api/validate/recaptcha', async (req, res) => {
  let result
  const captchaResponse = req.body.response;

  try {
    result = await util.promisify(request.post)('https://www.google.com/recaptcha/api/siteverify?secret='+ process.env.RECAPTCHA_KEY + '&response=' + captchaResponse);
  } catch(e) {
    console.log(e);
  }  

  const json = JSON.parse(result.body)

  return res.json({"success": json.success})
})