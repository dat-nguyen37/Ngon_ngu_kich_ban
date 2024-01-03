const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

Sequelize.Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
  
    return date.format('YYYY-MM-DD HH:mm:ss');
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    options: dbConfig.options
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({
    force: false
}).then(()=>{

    console.log("Drop and resync database with {force: true}")
})
db.User=require("./User.model")(sequelize,Sequelize)
db.Product=require("./product.model")(sequelize,Sequelize)
db.Category=require("./category.model.js")(sequelize,Sequelize)
db.Supplier=require("./supplier.model.js")(sequelize,Sequelize)
db.Role=require("./role.model.js")(sequelize,Sequelize)
db.Invoice=require("./invoice.model.js")(sequelize,Sequelize)
db.InvoiceDetail=require("./invoiceDetail.model.js")(sequelize,Sequelize)
db.Warehouse=require("./warehouse.model.js")(sequelize,Sequelize)
db.Log=require("./log.model.js")(sequelize,Sequelize)
db.Like=require("./like.model.js")(sequelize,Sequelize)
db.Comment=require("./comment.js")(sequelize,Sequelize)




//
db.Category.hasMany(db.Product,{
    foreignKey: "categoryId"
});
db.Product.belongsTo(db.Category,{
    foreignKey: "categoryId"
})

//
db.Warehouse.hasMany(db.Product,{
    foreignKey: "warehouseId"
});
db.Product.belongsTo(db.Warehouse,{
    foreignKey: "warehouseId"
})
//
db.Supplier.hasMany(db.Product,{
    foreignKey: "supplierId"
})
db.Product.belongsTo(db.Supplier,{
    foreignKey: "supplierId"
})
//
db.Product.hasMany(db.Comment,{
    foreignKey: "productId"
});
db.Comment.belongsTo(db.Product,{
    foreignKey: "productId"
})
//
db.User.hasMany(db.Role,{
    foreignKey: "userId"
});
db.Role.belongsTo(db.User,{
    foreignKey: "userId"
})
//
db.User.hasMany(db.Invoice,{
    foreignKey: "userId"
});
db.Invoice.belongsTo(db.User,{
    foreignKey: "userId"
})
//
db.User.hasMany(db.Like,{
    foreignKey: "userId"
});
db.Like.belongsTo(db.User,{
    foreignKey: "userId"
})
//
db.User.hasMany(db.InvoiceDetail,{
    foreignKey: "userId"
});
db.InvoiceDetail.belongsTo(db.User,{
    foreignKey: "userId"
})
//
db.User.hasMany(db.Comment,{
    foreignKey: "userId"
});
db.Comment.belongsTo(db.User,{
    foreignKey: "userId"
})
//
db.InvoiceDetail.hasMany(db.Invoice,{
    foreignKey: "invoiceDetailId"
});
db.Invoice.belongsTo(db.InvoiceDetail,{
    foreignKey: "invoiceDetailId"
})
//
db.Product.hasMany(db.InvoiceDetail,{
    foreignKey: "productId"
});
db.InvoiceDetail.belongsTo(db.Product,{
    foreignKey: "productId"
})
//
db.Product.hasMany(db.Like,{
    foreignKey: "productId"
});
db.Like.belongsTo(db.Product,{
    foreignKey: "productId"
})
//
db.User.hasMany(db.Log,{
    poreignKey:"userId"
})
db.Log.belongsTo(db.User,{
    foreignkey:"userId"
})

module.exports=db;