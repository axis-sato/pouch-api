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
      underscored: true
    }
  )

  Comment.associate = models => {
    Comment.belongsTo(models.Article, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Comment
}
