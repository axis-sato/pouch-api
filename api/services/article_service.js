const ArticleRepository = require("../repositories/article_repository")
const CommentRepository = require("../repositories/comment_repository")
const TagRepository = require("../repositories/tag_repository")

module.exports = class ArticleService {
  constructor() {}

  async getArticles(limit, firstCursor) {
    const articleRepository = new ArticleRepository()
    const commentRepository = new CommentRepository()
    const tagRepository = new TagRepository()
    let articles = await articleRepository.getArticles(limit, firstCursor)
    articles = await Promise.all(
      articles.map(async article => {
        const comments = await commentRepository.getCommentsByArticleId(
          article.id
        )
        article.comments = comments
        const tags = await tagRepository.getTagsByArticleId(article.id)
        article.tags = tags
        return article
      })
    )
    return articles
  }
}
