

module.exports=(sequelize,Sequelize)=>{
    const Supplier=sequelize.define("supplier",{
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            unique:{
                args: true,
                msg: "Name already use"
             },
             validate: {
                 notEmpty:{
                     args: true,
                     msg: "name can not be empty"
                 },
                 notNull:{
                     args: true,
                     msg: "Please enter Name"
                 }
             }
        },
        address:{
            type: Sequelize.STRING,
            allowNull: false,
            unique:{
                args: true,
                msg: "Address already use"
             },
             validate: {
                 notEmpty:{
                     args: true,
                     msg: "address can not be empty"
                 },
                 notNull:{
                     args: true,
                     msg: "Please enter address"
                 }
             }
        },
        phone:{
            type: Sequelize.BIGINT
        },
        email:{
            type: Sequelize.STRING
        }
    })
    return Supplier;
}