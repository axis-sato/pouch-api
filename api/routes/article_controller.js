const express = require('express')
const router = express.Router()
const ArticleService = require('../services/article_service')
const { validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const validator = require('../validators/article_validator')

router.post('/', validator.create_article, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  const queryData = matchedData(req)
  const url = queryData.url

  const articleService = new ArticleService()
  const article = await articleService.createArticle(url)

  res.json(article)
})

module.exports = router
