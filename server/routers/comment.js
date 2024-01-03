const express=require('express')
const controller=require('../controllers/comment');
const router=express.Router();

router.post("/:userId/:productId",controller.comment)
router.get("/:productId",controller.find)



module.exports=router