export default (sequelize, DataTypes) => {
  const Businesses = sequelize.define('Businesses', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Businesses.associate = function(models) {
    // associations can be defined here
    
    Businesses.hasMany(models.Products,{
      foreignKey: "businessId",
      onDelete: "CASCADE"
    })
    Businesses.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return Businesses;
};