const sequelize = require("sequelize")
const models = require("../models")
const Article = require("../eintities/article")

module.exports = class ArticleRepository {
  constructor() {}

  async getArticles(limit, firstCursor) {
    const sql = `
    SELECT * FROM articles WHERE id >= :firstId AND deleted_at is NULL LIMIT :limit
    `
    const articles = await models.sequelize.query(sql, {
      replacements: { limit: limit, firstId: firstCursor },
      type: sequelize.QueryTypes.SELECT
    })

    return articles.map(article => new Article(article))
  }

  async getArticle(id) {
    const sql = `
    SELECT * FROM articles WHERE id = :id AND deleted_at is NULL
    `
    const articles = await models.sequelize.query(sql, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT
    })

    if (articles.length === 0) {
      return null
    }

    return new Article(articles[0])
  }

  async updateRead(id, read) {
    const sql = `
    UPDATE articles SET \`read\` = :read, updated_at = CURRENT_TIMESTAMP WHERE id = :id
    `

    const r = read ? 1 : 0
    const result = await models.sequelize.query(sql, {
      replacements: { id: id, read: r },
      type: sequelize.QueryTypes.UPDATE
    })

    return result
  }

  async deleteArticle(id) {
    const sql = `
    UPDATE articles SET deleted_at = CURRENT_TIMESTAMP WHERE id = :id
    `

    await models.sequelize.query(sql, {
      replacements: { id: id },
      type: sequelize.QueryTypes.UPDATE
    })
  }
}
