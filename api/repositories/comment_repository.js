const sequelize = require("sequelize")
const models = require("../models")
const Comment = require("../eintities/comment")
const logger = require("../logger")

module.exports = class CommentRepository {
  constructor() {}

  async getCommentByArticleId(article_id) {
    const sql = `
      SELECT * FROM comments WHERE article_id = :article_id
      `
    const comments = await models.sequelize.query(sql, {
      replacements: { article_id: article_id },
      type: sequelize.QueryTypes.SELECT
    })

    return comments.length >= 1 ? new Comment(comments[0]) : null
  }
}
