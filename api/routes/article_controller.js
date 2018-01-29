const express = require("express")
const router = express.Router()
const ArticleService = require("../services/article_service")
const { validationResult } = require("express-validator/check")
const { matchedData } = require("express-validator/filter")
const validator = require("../validators/article_validator")
const logger = require("../logger")

router.get("/", validator.get_articles, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  const queryData = matchedData(req)
  const limit = queryData.limit
  const firstCursor = queryData.first_cursor

  const articleService = new ArticleService()
  const articles = await articleService.getArticles(limit, firstCursor)
  res.json(articles)
})

router.patch("/:id/read", validator.update_read, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  const queryData = matchedData(req)
  const id = queryData.id
  const read = queryData.read

  const articleService = new ArticleService()
  const article = await articleService.updateRead(id, read)
  if (article === null) {
    return res.status(404).json({ errors: {} })
  }

  res.json(article)
})

router.delete("/:id", validator.delete_article, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  const queryData = matchedData(req)
  const id = queryData.id

  const articleService = new ArticleService()
  await articleService.deleteArticle(id)

  res.json({})
})

module.exports = router
