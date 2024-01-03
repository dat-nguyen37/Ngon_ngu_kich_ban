const db=require('../models')
const Warehouse=db.Warehouse
const Op=db.Sequelize.Op
const { getPagination, getPaginData } = require("./util");

const createError=require('../error')

exports.create=(req,res,next)=>{
     const wareouse={
        name:req.body.name,
        location: req.body.location,
        description: req.body.description
     }
     Warehouse.create(wareouse)
     .then(data=>{
        res.status(200).send('Warehouse has been created')
     })
     .catch(err=>{
        next(createError(500,err))
     })
}
exports.findAll=(req,res,next)=>{
    Warehouse.findAll()
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.view=(req,res,next)=>{
    Warehouse.findOne({where:{id:req.params.id}})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.findAllByPage=(req,res,next)=>{
    const {page,size,name}=req.query
    const condition=name ? {name:{[Op.like]:`%${name}%`}} :null
    const {limit,offset}=getPagination(page,size)
    Warehouse.findAndCountAll({where:condition,limit,offset})
    .then(data=>{
        const reponse=getPaginData(data,page,limit)
        res.status(200).send(reponse)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.update=(req,res,next)=>{
    const id=req.params.id;
    Warehouse.update(req.body,{where:{id:id}})
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
    const id=req.params.id
    Warehouse.destroy({where:{id:id}})
    .then(data=>{
        if(data==1){
            res.status(200).send('delete successful')
        }
        else{
            res.status(400).send('connot delete wit id='+id)
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}