const tableName = "comments"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        article_id: 1,
        body: `# コメント1
        コメントだよ〜`
      },
      {
        article_id: 2,
        body: `# コメント2
        コメントだよ〜`
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null)
  }
}
