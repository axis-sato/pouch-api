module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING
      },
      image_path: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: "articles",
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  )
  return Article
}
