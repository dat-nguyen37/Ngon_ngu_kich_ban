const db=require('../models/index')
const Product=db.Product
const Category=db.Category
const Supplier=db.Supplier
const Warehouse=db.Warehouse
const { getPagination, getPaginData } = require("./util");
const Op = db.Sequelize.Op;
const {sendPaymentSuccessMessageToRabbitMQ}=require('./notifycation')
const multer=require('multer')

const createError=require('../error')
const path = require('path')



exports.create=(req,res,next)=>{
   const product={
    name:req.body.name,
    categoryId:req.body.categoryId,
    supplierId:req.body.supplierId, 
    warehouseId:req.body.warehouseId,
    image: path.posix.join("/images",req.file.filename),
    // image:req.body.image,
    price:req.body.price,
    quantity:req.body.quantity,
   }
//    if(req.role){
       Product.create(product)  
       .then(data=>{
        if(data){
    
            res.status(200).send("Product has been created")
            const message=`Successfully created product with Id ${data.id} at ${data.createdAt}`
          // Send message to RabbitMQ
          sendPaymentSuccessMessageToRabbitMQ(JSON.stringify(message));
        }
        else{
            res.status(400).send("Product cannot created")
        }
       })
       .catch(err=>{
        return next(createError(500,err))
       })
//    }else{
//        return res.status(403).json("Bạn không có quyền")
//    }

}
exports.findAll=(req,res,next)=>{
 
    Product.findAll({
        include:[
            {model: Category},
            {model: Supplier},
            {model: Warehouse}
        ]
    })  
    .then(data=>{
         res.status(200).send(data)
    })
    .catch(err=>{
     return next(createError(500,err))
    })
 }

 exports.findAllByPage=(req,res,next)=>{
 const {page,size,name}=req.query
 const condition=name ? {name: {[Op.like]:`%${name}%`}} :null;
 const {limit,offset}=getPagination(page,size)
    Product.findAndCountAll({
        include:[
            {model: Category},
            {model: Supplier},
            {model: Warehouse}
        ],
        where: condition,limit,offset
    })  
    .then(data=>{
        const response=getPaginData(data,page,limit)
         res.status(200).send(response)
    })
    .catch(err=>{
     return next(createError(500,err))
    })
 
 }
exports.update=(req,res,next)=>{
    const productUpdate={
        name:req.body.name,
        categoryId:req.body.categoryId,
        supplierId:req.body.supplierId, 
        warehouseId:req.body.warehouseId,
        image: path.posix.join("/images",req.file.filename),
        // image:req.body.image,
        price:req.body.price,
        quantity:req.body.quantity,
       }

    Product.update(productUpdate,{where: {id: req.params.id}})
    .then(data=>{
        if(data==1){

            res.status(200).send("Product has bên updated")
        }
        else{
            res.status(400).send("Product cannot updated")

        }
    })
    .catch(err=>{
       return next(createError(500,err))
    })
}
exports.delete=(req,res,next)=>{
    Product.destroy({where: {id: req.params.id}})
        .then(data=>{
            if(data==1){
                 res.status(200).send("product has been delete successful")
            }
            else{
                  res.status(400).send("product cannot delete")
            }
        })
        .catch(err=>{
            next(createError(500,err))
        })
}
exports.view=(req,res,next)=>{
    Product.findOne(
        {
            include:[{model: Category},{model: Supplier},{model:Warehouse}],
            
            where: {id:req.params.id}})
    .then(data=>{
        if(data){
            res.status(200).send(data)
        }else{
           res.status(400).send("Can not find product with id=" +req.params.id)
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.handleSort=async(req,res,next)=>{
    
    try {
        const { direction, column ,page,size} = req.query;
       const {limit,offset}=getPagination(page,size)
    
        if (!direction || !column) {
          return res.status(400).json({ error: 'Direction and column are required' });
        }
    
        const sortOrder = direction === 'asc' ? 'ASC' : 'DESC';
    
        const data = await Product.findAndCountAll({
          order: [[column, sortOrder]],
          include:[
            {model: Category},
            {model: Supplier},
            {model: Warehouse}
        ],
        limit,offset});
        const response=getPaginData(data,page,limit)
        res.status(200).json(response);
      } catch (error) {
        console.error(error);
        next(error); 
      }
}

//get product by categoryId

exports.findBycategoryId=(req,res,next)=>{
 
    Product.findAll({where:{categoryId:req.params.id}})  
    .then(data=>{
         res.status(200).send(data)
    })
    .catch(err=>{
     return next(createError(500,err))
    })
 }


 