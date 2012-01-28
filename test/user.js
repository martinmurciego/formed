module.exports = sequelize.define('User', {
  name: { 
    type: Sequelize.STRING, 
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 5
    }
  },
  email: { 
    type: Sequelize.TEXT, 
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 10
    }
  }
},{
  underscored: true
});