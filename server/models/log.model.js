module.exports=(sequelize,Sequelize)=>{

    const Log = sequelize.define('Log', {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        action: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
        },
      });
      return Log;
}