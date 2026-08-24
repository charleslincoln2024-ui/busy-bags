const cors = require('cors');
app.use(cors());
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

let orders = [];
if(fs.existsSync('orders.json')){ try{orders=JSON.parse(fs.readFileSync('orders.json'));}catch(e){} }

app.post('/api/order', (req,res)=>{
  const {name, phone, product, price, momoTxId} = req.body;
  if(!momoTxId || momoTxId.length < 4){ return res.json({success:false, message:'Enter valid MoMo Transaction ID'}); }
  const order = {id: Date.now(), name, phone, product, price, momoTxId, status:'PAID', date: new Date().toLocaleString()};
  orders.unshift(order);
  try{ fs.writeFileSync('orders.json', JSON.stringify(orders,null,2)); }catch(e){}
  try{ fs.appendFileSync('sales.csv', `${order.date},${name},${phone},${product},${price},${momoTxId}\n`);}catch(e){}
  console.log(`\n🔥 REAL MONEY ORDER! ${name} - ${product} - ${price} UGX - TxID: ${momoTxId}\n`);
  res.json({success:true, message:`Order OK! Verify TxID ${momoTxId} on 0776879873`});
});

app.get('/api/orders', (req,res)=> res.json(orders));

// FIXED FOR EXPRESS 5
app.use((req,res)=> res.sendFile(path.join(__dirname, '../frontend/index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`✅ REAL MONEY Busy Bags LIVE on http://localhost:${PORT} - Customers send to 0776879873`));
