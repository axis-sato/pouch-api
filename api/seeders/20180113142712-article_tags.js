const tableName = 'article_tags'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        article_id: 1,
        tag_id: 1
      },
      {
        article_id: 1,
        tag_id: 2
      },
      {
        article_id: 1,
        tag_id: 3
      },
      {
        article_id: 2,
        tag_id: 1
      },
      {
        article_id: 2,
        tag_id: 2
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null)
  }
}
