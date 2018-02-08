const Crawler = require("crawler")
const logger = require("../logger")

module.exports = class CrawlerService {
  constructor() {}

  fetchArticle(url) {
    return new Promise((resolve, reject) => {
      const callback = (error, res, done) => {
        if (error) {
          logger.error(error)
          reject(error)
        } else {
          const $ = res.$
          const title = $("title").text()
          const image_path =
            $("meta[property='og:image']").attr("content") || null
          resolve({
            title: title,
            url: url,
            image_path: image_path
          })
        }
        done()
      }

      const c = new Crawler({
        maxConnections: 1,
        callback: callback
      })
      c.queue(url)
    })
  }
}
