const db=require('../models')
const Like=db.Like


// like/dislike
exports.like=async(req,res,next)=>{
        const userId= req.params.userId
        const productId=req.params.productId
    try {
        const likes=await Like.findOne({where: {userId,productId}})
        if(!likes){
           const data= await Like.create({userId,productId})
           res.status(200).json(data)
           
        }else{
           const data= await Like.destroy({where: {userId,productId}})
           res.status(200).json("The product has been disliked")
        }
    } catch (err) {
        console.log(err)
    }
 }
 // get product like by user
 exports.find=async(req,res,next)=>{
    const {userId,productId}=req.query
   try {
    const data=userId ? await Like.findAll({where:{userId:userId}}) : await Like.findAll({where:{productId: productId}})
     res.status(200).json(data)
   } catch (err) {
       console.log(err)
   }

}