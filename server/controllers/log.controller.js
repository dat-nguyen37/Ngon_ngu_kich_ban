const db=require('../models')
const Log=db.Log
const User=db.User
const {getPagination,getPaginData}=require('./util')
const createError=require('../error')

exports.findAll=(req,res,next)=>{
    Log.findAll({include:[{model:User}]})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(er=>{
        next(createError(500,err))
    })
}
exports.findAllById=(req,res,next)=>{
    const userId=req.params.userId
    Log.findAll({include:[{model:User}],where:{userId:userId}})
    .then(data=>{
        if(data){
            res.status(200).send(data)
        }
        else{
            res.status(400).send('Cannot find userId='+userId)
        }
    })
    .catch(er=>{
        next(createError(500,err))
    })
}
exports.findAllByPage=(req,res,next)=>{
    const {page,size}=req.query
    const {limit,offset}=getPagination(page,size)
    Log.findAndCountAll({include:[{model:User}],limit,offset})
    .then(data=>{
        const reponse=getPaginData(data,page,limit)
        res.status(200).send(reponse)
    })
    .catch(error=>{
        res.status(500).send(error)
    })
}



 

