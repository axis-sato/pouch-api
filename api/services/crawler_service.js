module.exports = class CrawlerService {
  constructor() {}

  async fetchArticle(url) {
    return { title: "foo", url: url, image_path: "/tmp/foo" }
  }
}
