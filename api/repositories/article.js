const sequelize = require("sequelize")
const models = require("../models")
const Article = require("../eintities/article")

module.exports = class ArticleRepository {
  constructor() {}

  async getArticles(limit, firstCursor) {
    const articles = await models.sequelize.query(
      "SELECT * FROM articles WHERE id >= :firstId LIMIT :limit",
      {
        replacements: { limit: limit, firstId: firstCursor },
        type: sequelize.QueryTypes.SELECT
      }
    )

    return articles.map(article => new Article(article))
  }
}
