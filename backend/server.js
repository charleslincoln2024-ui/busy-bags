const express=require('express');const cors=require('cors');
const app=express();app.use(cors());app.use(express.json());
let products=[
{id:1,name:'Kiddie Space Backpack',price:45000,cat:'bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'},
{id:2,name:'Executive Tote Bag Leather',price:85000,cat:'bags',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'},
{id:3,name:"Men's Cotton T-Shirt",price:25000,cat:'fashion',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'},
{id:4,name:'Super Rice 5kg Premium',price:32000,cat:'grocery',img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'},
{id:5,name:'Leather Jacket Premium',price:60000,cat:'fashion',img:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'},
{id:6,name:'Tecno Spark 20 Phone',price:350000,cat:'phone',img:'https://images.unsplash.com/photo-1592899677977-9bb10ba128a5?w=400'},
{id:7,name:'School Shoes Leather',price:40000,cat:'fashion',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'},
{id:8,name:'Beauty Lipstick Set 12pcs',price:35000,cat:'beauty',img:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'},
{id:9,name:'Home Blender 1.5L',price:95000,cat:'home',img:'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400'},
{id:10,name:'Infinix Hot 40 Pro',price:420000,cat:'phone',img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'},
{id:11,name:'Women Handbag Classic',price:55000,cat:'bags',img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'},
{id:12,name:'Cooking Oil 3L Fortune',price:28000,cat:'grocery',img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'},
{id:13,name:'Samsung Galaxy A15',price:520000,cat:'phone',img:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'},
{id:14,name:'Face Cream Nivea Soft',price:18000,cat:'beauty',img:'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'},
{id:15,name:'Dining Plates Set 6pcs',price:65000,cat:'home',img:'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400'}
];
let orders=[];
app.get('/api/products',(req,res)=>res.json(products));
app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/orders',(req,res)=>{orders.push({...req.body,id:Date.now(),date:new Date()});res.json({ok:true})});
app.post('/api/products',(req,res)=>{let p={...req.body,id:Date.now()};products.push(p);res.json(p)});
app.get('/',(req,res)=>res.send('BusyBags API running - 15 products'));
const PORT=process.env.PORT||10000;app.listen(PORT,()=>console.log('Running '+PORT));
