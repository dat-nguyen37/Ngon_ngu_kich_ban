

module.exports=(sequelize,Sequelize)=>{
    const Category =sequelize.define("category",{
        name:{
            type:Sequelize.STRING,
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
        }
    })
    return Category
}