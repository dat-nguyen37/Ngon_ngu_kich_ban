const db=require('../models')
const Sequelize = require('sequelize');
const Invoice=db.Invoice
const User=db.User
const InvoiceDetail=db.InvoiceDetail
const {getPagination,getPaginData}=require('./util')
const Op=db.Sequelize.Op
const createError=require('../error')

exports.create=(req,res,next)=>{
    const invoice={
        invoiceDetailId:req.body.invoiceDetailId,
        userId: req.body.userId,
        totalAmount: req.body.totalAmount
    }
    Invoice.create(invoice)
    .then(data=>{
        res.status(200).send('create successful')
    })
    .catch(err=>[
        next(createError(500,err))
    ])
}
exports.findAll=(req,res,next)=>{
    Invoice.findAll({include:[{model:InvoiceDetail},{model:User}]})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.findAllBypage=(req,res,next)=>{
    const {page,size}=req.query
    const {limit,offset}=getPagination(page,size)
    Invoice.findAndCountAll({include:[{model:InvoiceDetail},{model:User}],limit,offset
    })
    .then(data=>{
        const response=getPaginData(data,page,limit)
        res.status(200).send(response)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.update=(req,res,next)=>{
    const id=req.params.id
    Invoice.update(req.body,{where:{id:id}})
    .then(data=>{
        if(data==1){
            res.status(200).send('update successful')
        }
        else{
            res.status(400).send('cannot update with id='+id)
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.delete=(req,res,next)=>{
    const id=req.params.id
    Invoice.destroy({where:{id:id}})
    .then(data=>{
        if(data==1){
            res.status(200).send('delete successful')
        }
        else{
            res.status(400).send('cannot delete with id='+id)
        }
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.sumTotal=(req,res,next)=>{
    Invoice.sum('totalAmount')
    .then(totalAmount=>{
        res.json(totalAmount)
    })
    .catch(err=>{
        next(createError(500,err))
    })
}
exports.sumTotalByMonth = async (req, res, next) => {
    try {
        const totalsByMonth = await Invoice.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'year'],
                [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'totalAmount'],
            ],
            group: ['year', 'month'],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'ASC'],
                [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'ASC'],
            ],
        });
  
      res.status(200).json(totalsByMonth);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };