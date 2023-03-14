const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const productRoutes = require('./routes/productRoutes') //new code

// Product Model
const Product = require('./models/Product');
// @route GET /products
// @desc Get ALL products
router.get('/', (req,res)=>{
   // Fetch all products from database
   Product.find({}, (error, products)=>{
       if (error) console.log(error)
       res.json(products)
   })
})

// @route POST /products
// @desc  Create a product
router.post('/', (req,res)=>{
   console.log(req.body)
   // Create a product item
   const newProduct = new Product({
       name: req.body.name,
       description: req.body.description,
       price: req.body.price,
       quantity: req.body.quantity,
   });

   newProduct.save((err, product)=>{
       if (err) console.log(err)
       res.json(product)
   })
})
// @route PUT api/products/:id
// @desc  Update a product
router.put('/:id', (req,res)=>{
   // Update a product in the database
   Product.updateOne({_id:req.params.id},{
       name: req.body.name,
       description: req.body.description,
       price: req.body.price,
       quantity: req.body.quantity,
   }, {upsert: true}, (err, product)=>{
       if(err) console.log(err);
       res.json(product)
   })
})
// @route DELETE api/products/:id
// @desc  Delete a product
router.delete('/:id', (req,res)=>{
   // Delete a product from database
   Product.deleteOne({_id: req.params.id}, (err)=>{
       if (err){
           console.log(err)
           res.json({success:false})
       }else{
           res.json({success:true})
       }
   })
})
// Initializing express
const app = express()

// Body parser middleware
app.use(express.json())

//DB config
const MONGODB_URI= process.env.MONGODB_URI || require('./config').mongoDB_URI

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true  })

// Check Connection
let db = mongoose.connection;
db.once('open', ()=>{
   console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error)=>{
   console.log(error);
})




// Define the PORT
const PORT = process.env.PORT || 5000

// Use Routes
app.use('/products', productRoutes)  //new code
app.listen(PORT, ()=>{
   console.log(`Server listening on port ${PORT}`)
})

module.exports = router;