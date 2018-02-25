const tableName = 'articles'
const columnName = 'read'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0,
      after: 'url'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(tableName, columnName)
  }
}
