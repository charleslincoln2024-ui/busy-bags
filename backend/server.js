const express=require('express');const cors=require('cors');
const app=express();
app.use(cors({origin:'*'}));app.use(express.json());
let orders=[]; 
let products=[
 {id:1,name:'Kiddie School Backpack',price:40000,cat:'bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300'},
 {id:2,name:'Executive Office Tote',price:85000,cat:'bags',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300'},
 {id:3,name:'Men T-Shirt Cotton',price:35000,cat:'fashion',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'},
 {id:4,name:'Rice 5kg Super',price:25000,cat:'grocery',img:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300'}
];
app.get('/',(req,res)=>res.send('BusyBags Jumia Backend'));
app.get('/api/products',(req,res)=>res.json(products));
app.post('/api/products',(req,res)=>{let p={id:Date.now(),...req.body};products.push(p);res.json({success:true,p})});
app.delete('/api/products/:id',(req,res)=>{products=products.filter(p=>p.id!=req.params.id);res.json({success:true})});
app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/orders',(req,res)=>{let o={...req.body,_id:Date.now(),createdAt:new Date()};orders.push(o);console.log('ORDER',o);res.json({success:true,o})});
app.listen(process.env.PORT||5000,()=>console.log('RUNNING'));
