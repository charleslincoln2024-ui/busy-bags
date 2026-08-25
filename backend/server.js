const express=require('express');
const cors=require('cors');
const path=require('path');
const app=express();
app.use(cors());
app.use(express.json());

// Safe Mongo - don't crash if missing
let mongoose=null, Product=null, Order=null;
try{
  mongoose=require('mongoose');
  const MONGO=process.env.MONGO_URI||process.env.MONGODB_URI||process.env.MONGODB_URL;
  if(MONGO){ mongoose.connect(MONGO).then(()=>console.log('Mongo OK')).catch(e=>console.log('Mongo fail')); }
}catch(e){ console.log('mongoose skip',e.message); }

// In-memory products - ALWAYS works
let memProducts=[
  { _id:'1', id:1, name:'Kiddie Backpack', price:45000, cat:'bags', category:'bags', img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'},
  { _id:'2', id:2, name:'Tote Leather Bag', price:85000, cat:'bags', category:'bags', img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', image:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'},
  { _id:'3', id:3, name:'Cozyleen Sofa Grey', price:850000, cat:'furniture', category:'furniture', img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'},
  { _id:'4', id:4, name:'White T-Shirt Classic', price:15000, cat:'fashion', category:'fashion', img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'},
  { _id:'5', id:5, name:'Black Polo Shirt', price:25000, cat:'fashion', category:'fashion', img:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', image:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400'},
  { _id:'6', id:6, name:'Summer Floral Dress', price:45000, cat:'fashion', category:'fashion', img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400', image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400'},
];
let memOrders=[];

app.get('/api/products',(req,res)=>{ res.json(memProducts); });
app.post('/api/products',(req,res)=>{ const p={_id:Date.now().toString(),id:Date.now(),...req.body,price:Number(req.body.price)}; memProducts.push(p); res.json(p); });
app.delete('/api/products/:id',(req,res)=>{ memProducts=memProducts.filter(x=>x._id!=req.params.id && x.id!=req.params.id); res.json({ok:true}); });

app.get('/api/orders',(req,res)=>{ res.json(memOrders); });
app.post('/api/orders',(req,res)=>{ const o={_id:Date.now().toString(),id:Date.now(),...req.body,date:new Date()}; memOrders.push(o); console.log('NEW ORDER',o); res.json({ok:true}); });
app.delete('/api/orders/:id',(req,res)=>{ memOrders=memOrders.filter(x=>x._id!=req.params.id && x.id!=req.params.id); res.json({ok:true}); });

app.get('/api/health',(req,res)=>res.json({ok:true, products:memProducts.length}));

const fs=require('fs');
const frontendPath=path.join(__dirname,'../frontend');
if(fs.existsSync(frontendPath)) app.use(express.static(frontendPath));

app.get('*',(req,res)=>{
  const idx=path.join(__dirname,'../frontend/index.html');
  if(fs.existsSync(idx)) return res.sendFile(idx);
  res.send('API OK <a href="/api/products">/api/products</a> <a href="/api/health">health</a>');
});

const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log('READY '+PORT+' products='+memProducts.length));
