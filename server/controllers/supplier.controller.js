const db=require('../models')
const Supplier=db.Supplier
const Op=db.Sequelize.Op
const {getPagination,getPaginData}=require('./util')
const createError=require('../error')

exports.create=(req,res,next)=>{
    const supplier={
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email
    }
    Supplier.create(supplier)
    .then(data=>{
        res.status(200).send('supplier has been created')
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.findAll=(req,res,next)=>{
    Supplier.findAll()
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.view=(req,res,next)=>{
    Supplier.findOne({where:{id:req.params.id}})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.findAllByPage=(req,res,next)=>{
    const {page,size,name}=req.query
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const {limit,offset}=getPagination(page,size)
    Supplier.findAndCountAll({where:condition,limit,offset})
    .then(data=>{
        const response=getPaginData(data,page,limit)
        res.status(200).send(response)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.update=(req,res,next)=>{
    const id=req.params.id;
    const update=req.body
    Supplier.update(update,{where:{id:id}})
    .then(data=>{
        if(data==1){
            res.status(200).send('update successful')
        }else{
            res.status(400).send('cannot update with id='+id)
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.delete=(req,res,next)=>{
    const id=req.params.id;
    Supplier.destroy({where:{id:id}})
    .then(data=>{
        if(data==1){
            res.status(200).send('delete successful')
        }else{
            res.status(400).send('cannot delete with id='+id)
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}