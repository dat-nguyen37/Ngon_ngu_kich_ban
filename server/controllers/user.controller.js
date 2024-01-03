const db=require('../models/index')
const User=db.User
const Role=db.Role
const md5=require('md5')
const {getPagination,getPaginData}=require('./util')
const Op=db.Sequelize.Op
const { QueryTypes } = require('sequelize');

exports.findAll=(req,res)=>{
    User.findAll()
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(403).send(err)
    })
}
exports.findById = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  };
exports.findAllBypage=(req,res)=>{
    const {page,size}=req.query
    const {limit,offset}=getPagination(page,size)
    User.findAndCountAll({limit,offset
    })
    .then(data=>{
        const response=getPaginData(data,page,limit)
        res.status(200).send(response)
    })
    .catch(err=>{
        res.status(403).send(err)    
    })
}
exports.update = (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    // Kiểm tra xem mật khẩu có được thay đổi hay không
    if (updatedUser.password) {
        // Mã hóa mật khẩu bằng md5
        updatedUser.password = md5(updatedUser.password);
    }
    
    User.update(updatedUser, {
        where: { id: id }
    })
    .then(num => {
        if (num==1) {
            res.send({
            message: "User was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + id
        });
    });
};

exports.delete=(req,res)=>{
    User.destroy(
        {where:{id:req.params.id}
    })
    .then(data=>{
        if(data==1){
            res.send({message: "User has been delete successful"})
        }
        else{
            res.send({message: `Cannot delete User with id=${req.params.id}`})
        }
    })
    .catch(err=>{
        res.send({message: err})
    })
}