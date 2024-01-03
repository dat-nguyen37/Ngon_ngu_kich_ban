
module.exports=(sequelize,Sequelize)=>{
    const Like=sequelize.define("like",{
         userId:{
            type: Sequelize.INTEGER
         },
         productId:{
            type: Sequelize.INTEGER
         }
    })
    return Like;
}