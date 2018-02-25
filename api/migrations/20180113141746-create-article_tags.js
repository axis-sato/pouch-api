const tableName = 'article_tags'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      article_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'articles',
          key: 'id'
        }
      },
      tag_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName)
  }
}
