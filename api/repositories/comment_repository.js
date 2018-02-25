const sequelize = require('sequelize')
const models = require('../models')
const Comment = require('../eintities/comment')

module.exports = class CommentRepository {
  async getCommentByArticleId (articleId) {
    const sql = `
      SELECT * FROM comments WHERE article_id = :article_id
      `
    const comments = await models.sequelize.query(sql, {
      replacements: { article_id: articleId },
      type: sequelize.QueryTypes.SELECT
    })

    return comments.length >= 1 ? new Comment(comments[0]) : null
  }
}
