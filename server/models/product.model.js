

module.exports=(sequelize,Sequelize)=>{
    const Product=sequelize.define("product",{

        name:{
            type: Sequelize.STRING,
            allowNull: false,
            unique:{   
               args:true,
               msg:"Name  alreadyin in use!"
            },
            validate:{
               notEmpty:{
                   args:true,
                   msg:"Name can not  be empty!"
               },
               notNull:{
                   args:true,
                   mgs: "Please enter name"
               }
            }
       },
       categoryId:{
        type:Sequelize.INTEGER
       },
       supplierId:{
        type:Sequelize.INTEGER
       },
       warehouseId:{
            type:Sequelize.INTEGER
       },
       image:{
        type:Sequelize.STRING
       },
        price:{
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        quantity:{
            type: Sequelize.INTEGER,
        }
    })
    return Product;
}