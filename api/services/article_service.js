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
        const comment = await commentRepository.getCommentByArticleId(
          article.id
        )
        article.comment = comment
        const tags = await tagRepository.getTagsByArticleId(article.id)
        article.tags = tags
        return article
      })
    )
    return articles
  }

  async updateArticle(id, url, tags, comment) {
    const articleRepository = new ArticleRepository()
    const article = await articleRepository.getArticle(id)
    if (article === null) {
      return null
    }

    await articleRepository.updateArticle(id, url, tags, comment)
    article.url = url
    article.tags = tags
    article.comment = comment
    return article
  }

  async updateComment(id, comment) {
    const articleRepository = new ArticleRepository()
    const article = await articleRepository.getArticle(id)
    if (article === null) {
      return null
    }
    await articleRepository.updateComment(id, comment)
    article.comment = comment
    return article
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
    delete article.comment
    return article
  }

  async deleteArticle(id) {
    const articleRepository = new ArticleRepository()
    await articleRepository.deleteArticle(id)
  }
}
