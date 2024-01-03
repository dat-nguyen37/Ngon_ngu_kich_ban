const router=require('express').Router()
const controller=require('../controllers/log.controller')

router.get('/findAll',controller.findAll)
router.get('/findAllById/:userId',controller.findAllById)
router.get('/findAllByPage',controller.findAllByPage)


module.exports=router