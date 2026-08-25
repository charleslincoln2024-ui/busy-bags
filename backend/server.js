const express=require('express');const cors=require('cors');
const app=express();app.use(cors());app.use(express.json());
let products=[
{id:1,name:'Kiddie Space Backpack',price:45000,cat:'bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'},
{id:2,name:'Executive Tote Bag Leather',price:85000,cat:'bags',img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'},
{id:6,name:'Tecno Spark 20 Phone',price:350000,cat:'phone',img:'https://images.unsplash.com/photo-1592899677977-9bb10ba128a5?w=400'},
{id:16,name:'Cozyleen 3-Seater Sofa Grey',price:850000,cat:'furniture',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'},
{id:17,name:'Cozyleen Dining Table 4 Chairs',price:1200000,cat:'furniture',img:'https://images.unsplash.com/photo-1615066028049-d1a3c00d11c3?w=400'},
{id:18,name:'Cozyleen Office Chair',price:350000,cat:'furniture',img:'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'},
];
let knickers=['Cotton Knickers 3 Pack','Lace Sexy Black','Seamless Nude 5pcs','High Waist White','Bikini Blue','Boyshort Grey','Lace Thong Red','Hipster Pack','Mens Boxer 3 Pack','Mens Cotton','Silk Satin Champagne','Period Panty Black','Bamboo Eco','Plus Size XL','Teen Cotton 5 Pack','Bridal White Lace','Sport Black','Maternity Soft','Mens Trunk Premium','Kids Girls 6 Pack'];
knickers.forEach((n,i)=>{products.push({id:30+i,name:n,price:12000+(i*1000),cat:'fashion',img:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'});});
let clothes=['White T-Shirt','Black Polo','Summer Dress Floral','Denim Jeans Slim','Skinny Black','Hoodie Grey','Formal Shirt','Ankara Dress','Chino Khaki','Blouse Pink','Denim Jacket','Kids Pack','Leggings Black','Sweatpants','Maxi Red','Crop Top','Linen Shirt','Baby Onesie','Blazer Black','Cargo Green','Pleated Skirt','Hoodie Black','Jumpsuit Denim','Vest White','Kitenge African','Yoga Pants','Trouser Black','Cardigan Cream','Couple Tees','Leather Belt','High Heels','Sneakers White','Baby Dress','Turtleneck','Bomber Jacket','Shorts Denim','Briefs 5 Pack','Evening Gown','Jeans Boys','Kaftan White','Palazzo Pants','Tank Top','Kimono Floral','School Uniform','Wedding Suit','Sports Bra','Shorts Khaki','Hoodie Red','Leather Skirt','Flannel Checkered','Baby Sweater','Crop Hoodie Pink','Jeans Stonewashed','Party Gold','Office Striped','Mom Jeans','Dress Unicorn','Dry Fit Tee','Silk Scarf','Cap Black'];
clothes.forEach((n,i)=>{products.push({id:60+i,name:n,price:15000+(i*2000),cat:'fashion',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'});});
let orders=[];app.get('/api/products',(req,res)=>res.json(products));app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/orders',(req,res)=>{orders.push({...req.body,id:Date.now()});res.json({ok:true})});
app.get('/',(req,res)=>res.send('BusyBags 105'));const PORT=process.env.PORT||10000;app.listen(PORT,()=>console.log('Running 105'));
