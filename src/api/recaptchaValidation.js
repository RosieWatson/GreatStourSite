const app = require('../server.js')
const request = require('request')
const util = require('util')

app.post('/api/validate/recaptcha', async (req, res) => {
  let result
  const captchaResponse = req.body.response;
  console.log(captchaResponse)

  try {
    result = await util.promisify(request.post)('https://www.google.com/recaptcha/api/siteverify?secret='+ '[secret]' + '&response=' + captchaResponse);    
  } catch(e) {
    console.log(e);
  }  
  
  return res.json({"success": result.body.success})
})