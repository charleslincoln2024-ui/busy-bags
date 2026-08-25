const express=require('express');
const cors=require('cors');
const path=require('path');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'../frontend')));

const MONGO=process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL;
if(MONGO){
  mongoose.connect(MONGO).then(()=>console.log('Mongo OK')).catch(e=>console.log('Mongo err',e.message));
}else{
  console.log('NO MONGO_URI - using memory');
}

let Product; try{ Product=require('./models/Product'); }catch(e){ Product=mongoose.model('Product', new mongoose.Schema({name:String,price:Number,cat:String,category:String,img:String,image:String},{strict:false})); }
let Order; try{ Order=require('./models/Order'); }catch(e){ Order=mongoose.model('Order', new mongoose.Schema({customerName:String,name:String,phone:String,address:String,items:Array,total:Number,date:Date},{strict:false,timestamps:true})); }

async function seed(){
  try{
    if(!mongoose.connection || mongoose.connection.readyState!==1) return setTimeout(seed,3000);
    const c=await Product.countDocuments();
    console.log('Products in DB:',c);
    if(c===0){
      const data=[
        {name:'Kiddie Backpack',price:45000,cat:'bags',category:'bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'},
        {name:'Tote Leather Bag',price:85000,cat:'bags',category:'bags',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',image:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'},
        {name:'Cozyleen Sofa Grey',price:850000,cat:'furniture',category:'furniture',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'},
        {name:'White T-Shirt Classic',price:15000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'},
        {name:'Black Polo Shirt',price:25000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',image:'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400'},
        {name:'Summer Floral Dress',price:45000,cat:'fashion',category:'fashion',img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400'},
      ];
      await Product.insertMany(data);
      console.log('SEED DONE');
    }
  }catch(e){ console.log('seed err',e.message); }
}
setTimeout(seed,3000);

try{ app.use('/api/auth',require('./routes/auth')); console.log('auth ok'); }catch(e){ console.log('auth skip'); }
try{ app.use('/api/products',require('./routes/products')); console.log('products route ok'); }catch(e){
  console.log('products custom');
  app.get('/api/products',async(req,res)=>{ try{ if(mongoose.connection.readyState===1){ const p=await Product.find(); return res.json(p);} res.json([]);}catch(err){res.json([]);} });
  app.post('/api/products',async(req,res)=>{ try{ const p=await Product.create(req.body); res.json(p);}catch(err){res.status(500).json({error:err.message});} });
  app.delete('/api/products/:id',async(req,res)=>{ try{ await Product.findByIdAndDelete(req.params.id); res.json({ok:true});}catch(err){res.status(500).json({error:err.message});} });
}
try{ app.use('/api/orders',require('./routes/orders')); console.log('orders route ok'); }catch(e){
  console.log('orders custom');
  app.get('/api/orders',async(req,res)=>{ try{ const o=await Order.find().sort({createdAt:-1}); res.json(o);}catch(err){res.json([]);} });
  app.post('/api/orders',async(req,res)=>{ try{ const o=await Order.create({...req.body,date:new Date()}); res.json({ok:true});}catch(err){res.status(500).json({error:err.message});} });
  app.delete('/api/orders/:id',async(req,res)=>{ try{ await Order.findByIdAndDelete(req.params.id); res.json({ok:true});}catch(err){res.status(500).json({error:err.message});} });
}

app.get('*',(req,res)=>{ const idx=path.join(__dirname,'../frontend/index.html'); const fs=require('fs'); if(fs.existsSync(idx)) return res.sendFile(idx); res.send('API running - /api/products'); });

const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log('READY PORT '+PORT));
