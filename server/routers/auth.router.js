const express=require('express')
const controller=require('../controllers/auth.controller.js');
const checkLogin = require('../verifyToken');
const router=express.Router();

router.post("/api/register",controller.register)
router.post("/api/signin",controller.signin)
router.get("/api/logout",checkLogin,controller.logout)



module.exports=router