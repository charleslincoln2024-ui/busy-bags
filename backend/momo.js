const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
async function getToken() {
  const key = process.env.MOMO_SUBSCRIPTION_KEY;
  const user = process.env.MOMO_API_USER || process.env.MOMO_API_USER_ID;
  const apiKey = process.env.MOMO_API_KEY;
  const res = await axios.post('https://sandbox.momodeveloper.mtn.com/collection/token/', {}, {
    headers: { 'Ocp-Apim-Subscription-Key': key },
    auth: { username: user, password: apiKey }
  });
  return res.data.access_token;
}
async function requestToPay(phone, amount, orderId) {
  const token = await getToken();
  const ref = uuidv4();
  await axios.post('https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay', {
    amount: amount, currency: 'EUR', externalId: orderId,
    payer: { partyIdType: 'MSISDN', partyId: phone },
    payerMessage: 'Busy Bags order', payeeNote: 'Busy Bags'
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Reference-Id': ref,
      'X-Target-Environment': 'sandbox',
      'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY
    }
  });
  return ref;
}
module.exports = { requestToPay };
