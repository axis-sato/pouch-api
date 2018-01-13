module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define(
    "Tag",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45)
      }
    },
    {
      tableName: "tags",
      underscored: true
    }
  )
  return Tag
}
