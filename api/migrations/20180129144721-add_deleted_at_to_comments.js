const tableName = "comments"
const columnName = "deleted_at"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.DATE,
      defaultValue: null,
      after: "updated_at"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(tableName, columnName)
  }
}
