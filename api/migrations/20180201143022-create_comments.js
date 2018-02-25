const tableName = 'comments'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      article_id: {
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'articles',
          key: 'id'
        }
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      updated_at: {
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
