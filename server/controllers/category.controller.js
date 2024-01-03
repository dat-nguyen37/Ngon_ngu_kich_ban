const db=require('../models')
const Category=db.Category
const createError=require('../error')
const {getPagination,getPaginData}=require('./util')
const Op=db.Sequelize.Op


exports.create=(req,res,next)=>{
   

        const category={
            name: req.body.name
        }
            Category.create(category)
            .then(data=>{
                if(data){
                    res.status(200).send("Category has been created")   
                }
                else{
                    res.status(400).send("Category cannot created")
                }
            })
            .catch(err=>{
                next(createError(500,err))
            })
    
}

exports.findAll=(req,res,next)=>{
        Category.findAll()
        .then(data=>{
            res.status(200).send(data)
        })
        .catch(err=>{
            next(createError(500,err))
        })
    
}
exports.view=(req,res,next)=>{

    Category.findOne({where:{id:req.params.id}})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        next(createError(500,err))
    })

}
exports.findAllByPage=(req,res,next)=>{
    const {page,size,name}=req.query
    const condition=name ? {name: {[Op.like]:`%${name}%`}} :null;
    const {limit,offset}=getPagination(page,size)
    Category.findAndCountAll({where:condition,limit,offset})
    .then(data=>{
        const reponse=getPaginData(data,page,limit)
        res.status(200).send(reponse)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.update=(req,res,next)=>{

    Category.update(req.body,{where :{id:req.params.id}})
    .then(data=>{
        if(data==1){
            res.status(200).send("Category has been updated")
        }
        else{
            res.status(400).send("Category cannot updated with id="+req.params.id)
        }
    })
    .catch(err=>{
        return next(createError(500,err))
    })
}
exports.delete=(req,res,next)=>{

    Category.destroy({where :{id:req.params.id}})
    .then(data=>{
        if(data==1){
            res.status(200).send("Category has been delete")
        }
        else{
            res.status(400).send("Category cannot delete with id="+req.params.id)
        }
    })
    .catch(err=>{
        return next(createError(500,err))
    })
}