const tableName = 'articles'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        title: 'title1',
        url: 'https://google.com'
      },
      {
        title: 'title2',
        url: 'https://facebook.com'
      },
      {
        title: 'title3',
        url: 'https://twitter.com'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null)
  }
}
