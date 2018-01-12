module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
      },
      article_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT
      }
    },
    {
      tableName: "comments",
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
      classMethods: {
        associate: models => {
          models.Comment.belongsTo(models.Article, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    }
  )

  return Comment
}
