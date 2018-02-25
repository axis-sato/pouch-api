const ArticleRepository = require('../repositories/article_repository')
const CommentRepository = require('../repositories/comment_repository')
const TagRepository = require('../repositories/tag_repository')
const CrawlerService = require('./crawler_service')

module.exports = class ArticleService {
  async getArticles (limit, firstCursor) {
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

  async createArticle (_url) {
    const crawlerService = new CrawlerService()
    const { title, url, imagePath } = await crawlerService.fetchArticle(_url)

    const articleRepository = new ArticleRepository()
    const articleId = await articleRepository.createArticle(
      title,
      url,
      imagePath
    )

    const article = await articleRepository.getArticle(articleId)
    return article
  }

  async updateArticle (id, url, tags, comment) {
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

  async updateTags (id, tagNames) {
    const articleRepository = new ArticleRepository()
    const article = await articleRepository.getArticle(id)
    if (article === null) {
      return null
    }

    const tagRepository = new TagRepository()

    // insert into tags if needed
    const tags = await Promise.all(
      tagNames.map(async tagName => {
        const tag = await tagRepository.getTagByName(tagName)
        if (tag !== null) {
          return tag
        }

        await tagRepository.addTag(tagName)
        return tagRepository.getTagByName(tagName)
      })
    )

    const tagIds = tags.map(tag => tag.id)

    // insert into article_tags
    for (let tagId of tagIds) {
      await tagRepository.addTags(id, tagId)
    }

    // delete from article_tags
    await tagRepository.deleteTags(id, tagIds)

    article.tags = tags
    return article
  }

  async updateComment (id, comment) {
    const articleRepository = new ArticleRepository()
    const article = await articleRepository.getArticle(id)
    if (article === null) {
      return null
    }
    await articleRepository.updateComment(id, comment)
    article.comment = comment
    return article
  }

  async updateRead (id, read) {
    const articleRepository = new ArticleRepository()
    const article = await articleRepository.getArticle(id)
    if (article === null) {
      return null
    }
    await articleRepository.updateRead(id, read)
    article.read = read
    return article
  }

  async deleteArticle (id) {
    const articleRepository = new ArticleRepository()
    await articleRepository.deleteArticle(id)
  }
}
