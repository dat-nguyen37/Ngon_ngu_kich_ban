

module.exports=(sequelize,Sequelize)=>{
    const Role=sequelize.define("role",{
        userId:{
            type:Sequelize.INTEGER
        },
        isAdmin:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
    return Role
}