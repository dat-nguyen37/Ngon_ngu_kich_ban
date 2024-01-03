
module.exports=(sequelize,Sequelize)=>{
    const Comment=sequelize.define("comment",{
         userId:{
            type: Sequelize.INTEGER
         },
         productId:{
            type: Sequelize.INTEGER
         },
         text:{
            type: Sequelize.STRING
         }
    })
    return Comment;
}