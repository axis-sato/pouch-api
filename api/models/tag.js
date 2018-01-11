"use strict"
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
      createdAt: "created_at",
      updatedAt: "updated_at",
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  )
  return Tag
}
