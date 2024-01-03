const express=require('express')
const controller=require('../controllers/like.controller.js');
const router=express.Router();

router.post("/:userId/:productId",controller.like)
router.get("/",controller.find)





module.exports=router