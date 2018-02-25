const Crawler = require('crawler')
const logger = require('../logger')

module.exports = class CrawlerService {
  fetchArticle (url) {
    return new Promise((resolve, reject) => {
      const callback = (error, res, done) => {
        if (error) {
          logger.error(error)
          reject(error)
        } else {
          const $ = res.$
          const title = $('title').text()
          const imagePath =
            $("meta[property='og:image']").attr('content') || null
          resolve({
            title: title,
            url: url,
            imagePath: imagePath
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
