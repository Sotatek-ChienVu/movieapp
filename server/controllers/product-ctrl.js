const Product = require('../models/product-model')

  CreateProduct = (req,res) => {
    const body = req.body;
    if(!body){
      return res.status(400).json({status: 'ERROR', message: 'Filed is not null' })
    }
    let product = null;
    if(req.body.price_sale){
     product = new Product({...body,percent_sale: Math.ceil((1 - req.body.price_sale/req.body.price)*100)});
    }
    else product = new Product({...body, percent_sale: null});

    console.log(body, 'body')

    console.log(product,'product')
    product.save()
    .then(()=> {
      return res.status(200).json({status: 'SUCCESS',message: 'Create product success'})
    })
    .catch((error)=> {
      return res.status(400).json({status: 'ERROR', message: error})
    })
}

GetProduct = (req,res) => { 
  Product.find({}, (err,product)=>{
    if(err){
      return res.status(400).json({message: 'Error get product', status: 'ERROR',error: err});
    }
    if(product.length < 1){
      return res.status(400).json({message: 'Product not found', status: 'ERROR'})
    }
      return res.status(200).json({status: 'SUCCESS',data: product})
  })
}

GetProductDetail = (req,res) => {
  Product.findOne({_id: req.params.id}, (err,product)=> {
    if(err){
      return res.status(400).json({message: err, status: 'ERROR'})
    }
    if(product.length < 1){
      return res.status(400).json({message: 'Product not found', status: 'ERROR'})
    }
    return res.status(200).json({status: 'SUCCESS',data: product})
  })
}

GetProductPage =(req,res) => {
  const perPage = 20;
  const page = req.params.page || 1;
  console.log(`page`,page);
  Product
   .find()
   .skip((perPage * page)-perPage)
   .limit(perPage)
   .exec((err, product) => {
     Product.countDocuments((err, count)=>{
       if(err){
         return res.status(400).json({status: 'ERROR',message: err})
       }
       return res.status(200).json({status: 'SUCCESS',total: count , indexPage: 20, page: page, product})
     })
   }) 
}

EditProduct = (req,res) => {
  console.log(req.body, 'resss')
  const id = req.params.id;
  
  Product.findOne({_id: id},(err,product)=> {
    console.log('product',product)
    if(err){
      return res.status(400).json({status: 'ERROR',message: err})
    }
    if(product?.length < 1){
      return res.status(201).json({status: 'ERROR', message: 'Not product id request',errorCode: 'ERROR.NOT.EXIST'})
    }
    product.description = req.body.description
    product.title = req.body.title
    product.price = req.body.price
    product.price_sale = req.body.price_sale
    product.percent_sale = Math.ceil((1 - req.body.price_sale/req.body.price)*100)
    product.image = req.body.image
    product.color = req.body.color
    product.size = req.body.size
    product.save()
    .then(()=> {
      return res.status(200).json({status: 'SUCCESS',message: 'Edit success'})
    })
    .catch(err => {
      return res.status(400).json({status: 'ERROR',message: err})
    })
  })
}

DeleteProduct = (req,res) => {
  console.log(req)
  const id = req.params.id;
  Product.findOne({_id: id}, (err,product)=> {
    console.log(`pr`, product);
    if(err){ 
      return res.status(400).json({status: 'ERROR',message: err})
    }
    if(product.length < 1){
      return res.status(400).json({status: 'ERROR',message: 'Product not found'})
    }
    product.delete()
    .then(()=> {
      return res.status(200).json({status: 'SUCCESS',message: 'Delete success'})
    })
    .catch(err => {
      return res.status(201).json({status: 'ERROR',message: err})
    })
  })
}

SearchProduct = (req,res) => {
  console.log(`req`,req.params);
  const result = [];
  Product.find({}, (err,product)=> {
    console.log(`product`,product);
    if(err){
      return res.status(401).json({status: 'ERROR', message: err})
    }
    if(product.length < 1){
      return res.status(400).json({status: 'ERROR',message: 'Product not found'})
    }
    product.forEach(el => {
      if(el.title.toLowerCase().includes(req.params.search) === true){
        result.push(el)
      }
    })
    if(result.length > 0){
      return res.status(200).json({status: 'SUCCESS',message: 'Search Success', result})
    }
    return res.status(400).json({status: 'ERROR',message: 'No result search', errorCode: 'ERROR.SEARCH.NOT.FOUND'})
  })
}

module.exports = { CreateProduct, GetProduct , EditProduct, DeleteProduct,SearchProduct, GetProductPage, GetProductDetail}