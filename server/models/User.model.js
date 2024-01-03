

module.exports=(sequelize,Sequelize)=>{
     const User =sequelize.define("user",{
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
               notEmpty:{
                   args:true,
                   msg:"name can not  be empty!"
               },
               notNull:{
                   args:true,
                   mgs: "Please enter name"
               }
            }
        },
        username:{
             type: Sequelize.STRING,
             allowNull: false,
             unique:{   
                args:true,
                msg:"Username address alreadyin in use!"
             },
             validate:{
                notEmpty:{
                    args:true,
                    msg:"username can not  be empty!"
                },
                notNull:{
                    args:true,
                    mgs: "Please enter username"
                }
             }
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique:{   
               args:true,
               msg:"Email address alreadyin in use!"
            },
            validate:{
               notEmpty:{
                   args:true,
                   msg:"Email can not  be empty!"
               },
               notNull:{
                   args:true,
                   mgs: "Please enter email"
               }
            }
       },
       password:{
        type:Sequelize.STRING
       },
       phone:{
        type: Sequelize.BIGINT
       },
       address:{
        type:Sequelize.STRING
       }
     })
     return User;
}