const express=require('express')
const router=express.Router()
const {upload}=require('../upload')
const controller=require('../controllers/product.controller')

router.post('/create',upload,controller.create)
router.get('/findAll',controller.findAll)
router.get('/findAllByPage',controller.findAllByPage)
router.get('/handleSort',controller.handleSort)
router.put('/update/:id',upload,controller.update)
router.delete('/delete/:id',controller.delete)
router.get('/view/:id',controller.view)
router.get('/productbyCategoryId/:id',controller.findBycategoryId)




module.exports=router