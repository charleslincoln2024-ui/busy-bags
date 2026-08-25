const express=require('express');
const cors=require('cors');
const path=require('path');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'../frontend')));
app.use(express.static(path.join(__dirname,'../../frontend')));

// MongoDB connect
const MONGO=process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/busybags';
mongoose.connect(MONGO).then(()=>console.log('Mongo connected')).catch(e=>console.log('Mongo error',e.message));

// Schemas - if you have models, use them, else create simple
let Product;
try{ Product=require('./models/Product'); }catch(e){
  Product=mongoose.model('Product', new mongoose.Schema({name:String,price:Number,cat:String,category:String,img:String,image:String},{strict:false}));
}
let Order;
try{ Order=require('./models/Order'); }catch(e){
  Order=mongoose.model('Order', new mongoose.Schema({customerName:String,name:String,phone:String,address:String,items:Array,products:Array,total:Number,totalAmount:Number,date:Date},{strict:false,timestamps:true}));
}

// Seed products if empty
async function seed(){
  try{
    const count=await Product.countDocuments();
    console.log('Product count',count);
    if(count===0){
      const prods=[
        {name:'Kiddie Backpack',price:45000,cat:'bags',category:'bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'},
        {name:'Tote Leather Bag',price:85000,cat:'bags',category:'bags',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',image:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'},
        {name:'Cozyleen Sofa Grey',price:850000,cat:'furniture',category:'furniture',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'},
        {name:'Cozyleen Dining Table',price:1200000,cat:'furniture',category:'furniture',img:'https://images.unsplash.com/photo-1615066028049-d1a3c00d11c3?w=400',image:'https://images.unsplash.com/photo-1615066028049-d1a3c00d11c3?w=400'},
        {name:'Cozyleen Office Chair',price:350000,cat:'furniture',category:'furniture',img:'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',image:'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'},
        {name:'Cotton Knickers 3 Pack',price:12000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'},
        {name:'White T-Shirt Classic',price:15000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'},
        {name:'Black Polo Shirt',price:25000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',image:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400'},
        {name:'Summer Floral Dress',price:45000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400'},
        {name:'Denim Jeans Slim',price:55000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',image:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'},
        {name:'Hoodie Grey Unisex',price:48000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'},
        {name:'Ankara African Dress',price:65000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',image:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'},
        {name:'Chino Pants Khaki',price:50000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',image:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400'},
        {name:'Blouse Pink Satin',price:38000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1594631252845-29fc4cc560c3?w=400',image:'https://images.unsplash.com/photo-1594631252845-29fc4cc560c3?w=400'},
        {name:'Sneakers White',price:65000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'},
        {name:'High Heels Red',price:55000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',image:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400'},
      ];
      await Product.insertMany(prods);
      console.log('SEEDED '+prods.length+' products');
    }
  }catch(e){console.log('seed error',e.message);}
}
setTimeout(seed,2000);

// Routes
try{
  app.use('/api/auth',require('./routes/auth'));
}catch(e){console.log('auth route skip',e.message)}
try{
  app.use('/api/products',require('./routes/products'));
}catch(e){
  console.log('products route custom');
  app.get('/api/products',async(req,res)=>{try{const p=await Product.find();res.json(p);}catch(e){res.json([]);}});
  app.post('/api/products',async(req,res)=>{try{const p=await Product.create(req.body);res.json(p);}catch(e){res.status(500).json({error:e.message});}});
  app.delete('/api/products/:id',async(req,res)=>{try{await Product.findByIdAndDelete(req.params.id);res.json({ok:true});}catch(e){res.status(500).json({error:e.message});}});
}
try{
  app.use('/api/orders',require('./routes/orders'));
}catch(e){
  console.log('orders route custom');
  app.get('/api/orders',async(req,res)=>{try{const o=await Order.find().sort({createdAt:-1});res.json(o);}catch(e){res.json([]);}});
  app.post('/api/orders',async(req,res)=>{try{const o=await Order.create({...req.body,date:new Date()});console.log('NEW ORDER',o._id);res.json({ok:true});}catch(e){res.status(500).json({error:e.message});}});
  app.delete('/api/orders/:id',async(req,res)=>{try{await Order.findByIdAndDelete(req.params.id);res.json({ok:true});}catch(e){res.status(500).json({error:e.message});}});
}

// Fallback for frontend
app.get('*',(req,res)=>{
  const fs=require('fs');
  let paths=[path.join(__dirname,'../frontend/index.html'),path.join(__dirname,'../../frontend/index.html'),path.join(__dirname,'../frontend/admin.html')];
  for(let p of paths){ if(fs.existsSync(p) && req.path==='/' && p.includes('index.html')) return res.sendFile(p); }
  const idx=path.join(__dirname,'../frontend/index.html');
  if(fs.existsSync(idx)) return res.sendFile(idx);
  res.send('API running - <a href="/api/products">products</a>');
});

const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log('SERVER READY on '+PORT));
