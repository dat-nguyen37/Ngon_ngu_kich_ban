const express=require('express')
const controller=require('../controllers/user.controller')
const router=express.Router()


router.get('/api/findAll',controller.findAll)
router.get('/api/findById/:id',controller.findById)

router.get('/api/findAllByPage',controller.findAllBypage)

router.put('/api/update/:id',controller.update)
router.delete('/api/delete/:id',controller.delete)


module.exports=router;