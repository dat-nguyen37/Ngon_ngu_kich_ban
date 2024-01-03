

module.exports=(sequelize,Sequelize)=>{
    const Warehouse = sequelize.define('Warehouse', {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
      });
      return Warehouse;
}