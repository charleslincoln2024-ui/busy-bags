const express=require('express');const cors=require('cors');
const app=express();app.use(cors());app.use(express.json());
const base=[
{id:1,name:'Kiddie Space Backpack',price:45000,cat:'bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'},
{id:2,name:'Executive Tote Bag Leather',price:85000,cat:'bags',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'},
{id:6,name:'Tecno Spark 20 Phone',price:350000,cat:'phone',img:'https://images.unsplash.com/photo-1592899677977-9bb10ba128a5?w=400'},
{id:16,name:'Cozyleen 3-Seater Sofa Grey',price:850000,cat:'furniture',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'},
{id:17,name:'Cozyleen Wooden Dining Table 4 Chairs',price:1200000,cat:'furniture',img:'https://images.unsplash.com/photo-1615066028049-d1a3c00d11c3?w=400'},
{id:18,name:'Cozyleen Office Chair Executive',price:350000,cat:'furniture',img:'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'},
{id:19,name:'Cozyleen TV Stand Modern',price:280000,cat:'furniture',img:'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400'},
{id:20,name:'Cozyleen Double Bed Frame Wood',price:950000,cat:'furniture',img:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'},
{id:21,name:'Cozyleen Coffee Table Center',price:180000,cat:'furniture',img:'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=400'},
];
let products=[...base];
let knickers=[
'Cotton Knickers 3 Pack','Lace Knickers Sexy Black','Seamless Knickers Nude 5pcs','High Waist Knickers White','Bikini Knickers Blue','Boyshort Sport Grey','Lace Thong Red','Hipster Pack','Mens Boxer 3 Pack','Mens Cotton Boxers','Silk Satin Champagne','Period Panty Black','Bamboo Fiber Eco','Plus Size Lace XL','Teen Cotton 5 Pack','Bridal White Lace','Sport Seamless Black','Maternity Soft Cotton','Mens Trunk Premium','Kids Girls 6 Pack'
];
knickers.forEach((n,i)=>{
 products.push({id:30+i,name:n,price:12000 + (i*1000),cat:'fashion',img:`https://images.unsplash.com/photo-${['1594633312681-425c7b97ccd1','1584370848010-d7fe6bc767ec','1617331726728-86d53c9bf7d0','1598554747436-c9293d6a588f','1602810318383-e386cc2a3ccf'][i%5]}?w=400`});
});
let clothesNames=[
'Classic White T-Shirt','Black Polo Shirt','Summer Dress Floral','Denim Jeans Slim','Skinny Jeans Black','Hoodie Grey','Formal Shirt White','Ankara Print Dress','Chino Pants Khaki','Blouse Satin Pink','Denim Jacket Blue','Kids T-Shirt Pack','Leggings Black','Sweatpants Grey','Maxi Dress Red','Crop Top White','Linen Shirt','Baby Onesie 3 Pack','Blazer Black Office','Cargo Pants Green','Pleated Skirt','Oversized Hoodie Black','Jumpsuit Denim','Vest Sleeveless White','Kitenge Dress African','Yoga Pants High Waist','Formal Trouser Black','Cardigan Knit Cream','Couple T-Shirts','Leather Belt Brown','High Heels Shoes','Sneakers White','Baby Dress Pink','Turtleneck Black','Bomber Jacket Green','Shorts Denim','Briefs Pack 5','Evening Gown Black','Jeans Boys Blue','Kaftan African White','Palazzo Pants','Tank Top Gym','Kimono Floral','School Uniform White','Wedding Suit Black','Sports Bra Pink','Shorts Casual Khaki','Hoodie Red Cartoon','Leather Skirt Black','Flannel Checkered','Baby Sweater Wool','Crop Hoodie Pink','Jeans Jacket Stonewashed','Party Dress Gold','Office Shirt Striped','Mom Jeans High Waist','Dress Unicorn Rainbow','Athletic T-Shirt Dry Fit','Silk Scarf Luxury','Cap Baseball Black'
];
clothesNames.forEach((n,i)=>{
 products.push({id:60+i,name:n,price:15000 + (i*2000),cat:'fashion',img:`https://images.unsplash.com/photo-${['1521572163474-6864f9cf17ab','1586790170083-2f9ceadc732d','1496747611176-843222e1e57c','1542272604-787c3835535d','1541099649105-f69ad21f3246'][i%5]}?w=400`});
});
let orders=[];
app.get('/api/products',(req,res)=>res.json(products));
app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/orders',(req,res)=>{orders.push({...req.body,id:Date.now(),date:new Date()});res.json({ok:true})});
app.get('/',(req,res)=>res.send('BusyBags 105 products'));
const PORT=process.env.PORT||10000;app.listen(PORT,()=>console.log('Running 105'));
