const db=require('../models')
const Role=db.Role
const User=db.User

const createError=require('../error')

exports.create=(req,res,next)=>{
    const role={
        userId:req.body.userId,
    }
    Role.create(role)
    .then(data=>{
        if(data){
            res.status(200).send("Role has been created")
        }else{
            res.status(400).send("Role cannot create")
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.update=(req,res,next)=>{

    Role.update(req.body,{where: {id:req.params.id}})
    .then(data=>{
        if(data==1){
            res.status(200).send("Role has been updated")
        }else{
            res.status(400).send("Role cannot update")
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}

exports.findAll=(req,res,next)=>{

    Role.findAll({include:[{model:User}]})
    .then(data=>{
            res.status(200).send(data)
    })
    .catch(err=>{
        next(createError(500,err))
    })

}
exports.delete=(req,res,next)=>{

    Role.destroy({where: {id:req.params.id}})
    .then(data=>{
        if(data==1){
            res.status(200).send("Role has been deleted")
        }else{
            res.status(400).send("Role cannot delete with id="+req.params.id)
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}