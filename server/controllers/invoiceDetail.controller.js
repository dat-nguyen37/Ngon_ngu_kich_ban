const db=require('../models')
const InvoiceDetail=db.InvoiceDetail
const Product=db.Product
const User=db.User
const Op=db.Sequelize.Op
const {getPagination,getPaginData}=require('./util')
const createError=require('../error')
const stripe=require('stripe')
const amqp = require('amqplib');
const {sendPaymentSuccessMessageToRabbitMQ,consumePaymentSuccessMessages}=require('./notifycation')



exports.create=async(req,res,next)=>{
        const price = req.body.price;
        const quantity = req.body.quantity;
        const totalAmount = price * quantity;
        const userId=req.params.id;
        const productId=req.body.productId;
        const image=req.body.image;
        const invoiceDetail={
             userId:userId,
             productId:productId,
             image:image,
             price:price,
             quantity:quantity,
             totalAmount:totalAmount
        }

        try {
          const invoicedetails=await InvoiceDetail.findAll({where:{userId:userId}})
          const validProductId=invoicedetails.some(s=>productId===s.productId)
          if(validProductId){
             return res.status(409).json("Sản phẩm đã có trong giỏ hàng")
          }
          const newInvoiceDetail=await InvoiceDetail.create(invoiceDetail)
          res.status(200).json(newInvoiceDetail)
        } catch (err) {
          res.status(500).json(err)
        }
      }
exports.findAll=(req,res,next)=>{

        InvoiceDetail.findAll({include:[{model:User},{model:Product}]})
        .then(data=>{
            res.status(200).send(data)
        })
        .catch(err=>{
            next(createError(500,err))
        })
}
exports.findAllByPageAndId=(req,res,next)=>{
    const {page,size}=req.query 
    const {limit,offset}=getPagination(page,size)
   

        InvoiceDetail.findAndCountAll({
            include: [{ model: User }, { model: Product }],
            where: {userId:req.params.id},
            limit: limit, 
            offset: offset
          })
          
        .then(data=>{
            const reponse=getPaginData(data,page,limit)
            res.status(200).send(reponse)
        })
        .catch(err=>{
            next(createError(500,err))
        })
    
}
exports.view=(req,res,next)=>{

      InvoiceDetail.findOne({
          include: [{ model: User }, { model: Product }],
          where: {id:req.params.id},
        })
        
      .then(data=>{
          res.status(200).send(data)
      })
      .catch(err=>{
          next(createError(500,err))
      })
  
}
exports.findAllById=(req,res,next)=>{

        InvoiceDetail.findAndCountAll({
            include: [{ model: User }, { model: Product }],
            where: {userId:req.params.id},
          })
          
        .then(data=>{
            res.status(200).send(data)
        })
        .catch(err=>{
            next(createError(500,err))
        })
    
}
exports.findAllByPage=(req,res,next)=>{
    const {page,size}=req.query 
    const {limit,offset}=getPagination(page,size)
   

        InvoiceDetail.findAndCountAll({
            include: [{ model: User }, { model: Product }],
            limit: limit, 
            offset: offset
          })
          
        .then(data=>{
            const reponse=getPaginData(data,page,limit)
            res.status(200).send(reponse)
        })
        .catch(err=>{
            next(createError(500,err))
        })
    
}
exports.update=(req,res,next)=>{
    const id=req.params.id
    update=req.body;
    if(update.price && update.quantity)
    {
        update.totalAmount=update.price * update.quantity
    }

        InvoiceDetail.update(update,{where:{id:id,userId:req.id}})
        .then(data=>{
            if(data==1){
                res.status(200).send('update successful')
            }
            else{
                res.status(400).send('cannot update with id='+id)
            }
        })
        .catch(err=>{ next(createError(500,err))})
}
exports.delete=(req,res,next)=>{
    const id=req.params.id

        InvoiceDetail.destroy({where:{id:id}})
        .then(data=>{
            if(data==1){
                res.status(200).send('delete successful')
            }
            else{
                res.status(400).send('cannot delete with id='+id)
            }
            
        })
        .catch(err=>{
            next(createError(500,err))
        })
}
exports.sumTotal=(req,res,next)=>{
    InvoiceDetail.sum('totalAmount',{where:{userId:req.params.id}})
    .then(totalAmount=>{
        res.json(totalAmount)
    })
}


exports.checkout = async (req, res, next) => {
    let stripeGateway=stripe(process.env.stripe_api);
    let DOMAIN = process.env.DOMAIN;
    try {
      const invoiceDetails = await InvoiceDetail.findAll({
        include: [{ model: Product }],
        where: { userId: req.params.id },
      });
  
      const lineItems = invoiceDetails.map((data) => {

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: data.product.name, 
            },
            unit_amount: data.price,
          },
          quantity: data.quantity,
        };
      });  
      // Create Checkout Session
      const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,
        billing_address_collection: 'required',
      });
      res.json({ url: session.url });
      
      const message=`Payment success for user ID ${req.params.id}`
      // Send message to RabbitMQ
      await sendPaymentSuccessMessageToRabbitMQ(JSON.stringify(message));
      
    } catch (err) {
      next(createError(500, err));
    } 
}
exports.messages=async(req,res)=>{
  try {
    const message = await consumePaymentSuccessMessages();
    res.json( message );
    console.log(message)
  } catch (error) {
    console.error('Error getting message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
