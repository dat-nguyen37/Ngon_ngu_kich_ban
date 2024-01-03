const db=require('../models')
const Comment=db.Comment
const User=db.User


exports.comment=async(req,res,next)=>{
   const comment={
    userId: req.params.userId,
    productId:req.params.productId,
    text:req.body.text
   }
   try {
    const data=await Comment.create(comment)
    res.status(200).json(data)
   } catch (err) {
    res.status(500).json(err)
   }
 
 }

 exports.find=async(req,res,next)=>{
    try {
     const data=await Comment.findAll({
      include:[{
        model:User,
        attributes: ['name'],
      }],
      where:{productId:req.params.productId},
      order: [['createdAt', 'DESC']],
    })
     res.status(200).json(data)
    } catch (err) {
     res.status(500).json(err)
    }
  
  }