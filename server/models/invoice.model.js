module.exports=(sequelize,Sequelize)=>{
    const Invoice=sequelize.define('invoice',{
        invoiceDetailId:{
            type:Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        totalAmount:{
            type: Sequelize.DOUBLE
        }
    })
    return Invoice;
}