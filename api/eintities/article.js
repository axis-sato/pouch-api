module.exports = class Article {
  constructor(article, tags = null, comment = null) {
    this.id = article.id
    this.title = article.title
    this.url = article.url
    this.image_path = article.image_path
    this.read = article.read === 1
    this.created_at = article.created_at
    this.updated_at = article.updated_at
    this.tags = tags
    this.comment = comment
  }
}
