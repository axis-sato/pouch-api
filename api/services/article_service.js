const ArticleRepository = require("../repositories/article_repository")
const CommentRepository = require("../repositories/comment_repository")
const TagRepository = require("../repositories/tag_repository")
const logger = require("../logger")

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

  async updateRead(id, read) {
    const articleRepository = new ArticleRepository()
    const article = await articleRepository.getArticle(id)
    if (article === null) {
      return null
    }
    await articleRepository.updateRead(id, read)
    article.read = read
    delete article.tags
    delete article.comments
    return article
  }
}
