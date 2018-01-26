const sequelize = require("sequelize")
const models = require("../models")
const Article = require("../eintities/article")

module.exports = class ArticleRepository {
  constructor() {}

  async getArticles(limit, firstCursor) {
    const sql = `
SELECT * FROM articles WHERE id >= :firstId LIMIT :limit
    `
    const articles = await models.sequelize.query(sql, {
      replacements: { limit: limit, firstId: firstCursor },
      type: sequelize.QueryTypes.SELECT
    })

    return articles.map(article => new Article(article))
  }
}
