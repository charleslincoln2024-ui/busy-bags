const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
let orders=[];
app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/orders',(req,res)=>{
 const order={...req.body, _id:Date.now(), createdAt:new Date()};
 orders.push(order);
 console.log('New Order:', order);
 res.json({success:true, order});
});
app.get('/',(req,res)=>res.send('Busy Bags Backend Running'));
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('Running on '+PORT));
