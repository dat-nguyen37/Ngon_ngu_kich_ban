module.exports=(sequelize,Sequelize)=>{
    const InvoiceDetail=sequelize.define('invoiceDetail',{
       userId:{
            type: Sequelize.INTEGER
       },
       productId:{
            type: Sequelize.INTEGER
       },
       image:{
        type: Sequelize.STRING
       },
       price:{
        type: Sequelize.DOUBLE
       },
        quantity:{
            type: Sequelize.INTEGER,
        },
        totalAmount:{
            type: Sequelize.DOUBLE
        }
    })
    return InvoiceDetail;
}