const tableName = 'tags'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        name: 'tag1'
      },
      {
        name: 'tag2'
      },
      {
        name: 'tag3'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null)
  }
}
