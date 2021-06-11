const Sequelize = require('sequelize');

module.exports = class Qa extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Qa',
      tableName: 'qas',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Qa.belongsTo(db.User);
  //  db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};