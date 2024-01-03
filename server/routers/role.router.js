const router=require("express").Router();
const controller=require("../controllers/role.controller")

router.post('/create',controller.create)
router.get('/findAll',controller.findAll)
router.put('/update/:id',controller.update)
router.delete('/delete/:id',controller.delete)



module.exports=router