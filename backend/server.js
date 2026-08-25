const express=require('express');
const cors=require('cors');
const path=require('path');
const app=express();
app.use(cors());
app.use(express.json());

// Serve frontend static
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static('frontend'));
app.use(express.static('../frontend'));
app.use(express.static('./frontend'));

let products=[
{id:1,name:'Kiddie Backpack',price:45000,cat:'bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'},
{id:2,name:'Tote Leather Bag',price:85000,cat:'bags',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'},
{id:16,name:'Cozyleen Sofa Grey',price:850000,cat:'furniture',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'},
{id:17,name:'Cozyleen Dining Table',price:1200000,cat:'furniture',img:'https://images.unsplash.com/photo-1615066028049-d1a3c00d11c3?w=400'},
{id:18,name:'Cozyleen Office Chair',price:350000,cat:'furniture',img:'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'},
{id:30,name:'Cotton Knickers 3 Pack',price:12000,cat:'fashion',img:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'},
{id:60,name:'White T-Shirt Classic',price:15000,cat:'fashion',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'},
{id:61,name:'Black Polo Shirt',price:25000,cat:'fashion',img:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400'},
{id:62,name:'Summer Floral Dress',price:45000,cat:'fashion',img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400'},
{id:63,name:'Denim Jeans Slim',price:55000,cat:'fashion',img:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'},
{id:65,name:'Hoodie Grey Unisex',price:48000,cat:'fashion',img:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'},
{id:67,name:'Ankara African Dress',price:65000,cat:'fashion',img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'},
{id:68,name:'Chino Pants Khaki',price:50000,cat:'fashion',img:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400'},
{id:69,name:'Blouse Pink Satin',price:38000,cat:'fashion',img:'https://images.unsplash.com/photo-1594631252845-29fc4cc560c3?w=400'},
{id:83,name:'Sneakers White',price:65000,cat:'fashion',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'},
{id:84,name:'High Heels Red',price:55000,cat:'fashion',img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400'},
];
let orders=[];

app.get('/api/products',(req,res)=>res.json(products));
app.post('/api/products',(req,res)=>{const p={id:Date.now(),...req.body,price:Number(req.body.price)};products.push(p);res.json(p);});
app.delete('/api/products/:id',(req,res)=>{products=products.filter(x=>x.id!=req.params.id);res.json({ok:true})});
app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/orders',(req,res)=>{const o={...req.body,id:Date.now(),date:new Date().toISOString()};orders.push(o);console.log('ORDER',o);res.json({ok:true})});
app.delete('/api/orders/:id',(req,res)=>{orders=orders.filter(x=>x.id!=req.params.id);res.json({ok:true})});

// Fallback - serve index.html for any route
app.get('*',(req,res)=>{
  const fs=require('fs');
  let p1=path.join(__dirname,'../frontend/index.html');
  let p2=path.join(__dirname,'../../frontend/index.html');
  let p3=path.join(__dirname,'frontend/index.html');
  let p4='../frontend/index.html';
  if(fs.existsSync(p1)) return res.sendFile(p1);
  if(fs.existsSync(p2)) return res.sendFile(p2);
  if(fs.existsSync(p3)) return res.sendFile(p3);
  if(fs.existsSync(p4)) return res.sendFile(path.resolve(p4));
  res.send('<h1>BUSYBAGS API Running</h1><p>Products: <a href="/api/products">/api/products</a></p><p>Admin: <a href="/admin.html">/admin.html</a></p>');
});

const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log('SERVER FIXED - port '+PORT));
