export default (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    },
    category: {
      type: DataTypes.STRING
    },
    businessId: {
      type: DataTypes.INTEGER
    }
  }, 
  {}
  );
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Businesses, {
      foreignKey: "businessId",
      onDelete: "CASCADE"
    })
  };
  return Products;
};