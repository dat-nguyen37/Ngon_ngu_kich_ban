const router=require('express').Router();
const controller=require('../controllers/invoice.controller')


router.post('/create',controller.create)
router.get('/findAll',controller.findAll)
router.get('/findAllByPage',controller.findAllBypage)

router.put('/update/:id',controller.update)
router.delete('/delete/:id',controller.delete)
router.get('/sumTotal',controller.sumTotal)
router.get('/sumTotalByMonth',controller.sumTotalByMonth)





module.exports=router