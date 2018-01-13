module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(45)
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING
      },
      image_path: {
        defaultValue: null,
        type: DataTypes.STRING
      }
    },
    {
      tableName: "articles",
      underscored: true
    }
  )

  return Article
}
