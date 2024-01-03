const router=require('express').Router();
const controller=require('../controllers/warehouse.controller')
const createLog=require('../log')
const checkLogin= require('../verifyToken');

router.post('/create',controller.create)
router.get('/findAll',controller.findAll)
router.get('/view/:id',controller.view)

router.get('/findAllByPage',controller.findAllByPage)

router.put('/update/:id',controller.update)
router.delete('/delete/:id',controller.delete)




module.exports=router