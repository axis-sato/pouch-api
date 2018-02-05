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

  async updateArticle(id, url, tags, comment) {
    const sql = `
    UPDATE articles 
    LEFT JOIN comments ON articles.id = comments.article_id
    SET 
    url = :url, 
    body = :comment, 
    articles.updated_at = CURRENT_TIMESTAMP,
    comments.updated_at = CURRENT_TIMESTAMP
    WHERE id = :id
    `
    await models.sequelize.query(sql, {
      replacements: { id: id, url: url, comment: comment },
      type: sequelize.QueryTypes.UPDATE
    })
  }

  async updateComment(id, comment) {
    const sql = `
    INSERT INTO comments (article_id, body) VALUES (:id, :comment)
    ON DUPLICATE KEY UPDATE 
    article_id=VALUES(article_id), body=VALUES(body), updated_at=CURRENT_TIMESTAMP
    `

    const result = await models.sequelize.query(sql, {
      replacements: { id: id, comment: comment },
      type: sequelize.QueryTypes.UPDATE
    })

    return result
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
    UPDATE articles SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = :id
    `

    await models.sequelize.query(sql, {
      replacements: { id: id },
      type: sequelize.QueryTypes.UPDATE
    })
  }
}
