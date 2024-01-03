const router=require('express').Router();
const controller=require('../controllers/invoiceDetail.controller');


router.post('/create/:id',controller.create)
router.get('/findAll',controller.findAll)
router.get('/findAllByPageAndUserId/:id',controller.findAllByPageAndId)
router.get('/findAllById/:id',controller.findAllById)
router.get('/view/:id', controller.view)

router.get('/findAllByPage',controller.findAllByPage)
router.get('/sumTotal/:id',controller.sumTotal)
router.post('/stripe-checkout/:id',controller.checkout)
router.put('/update/:id',controller.update)
router.delete('/delete/:id',controller.delete)
router.get('/get-messages', controller.messages)


module.exports=router