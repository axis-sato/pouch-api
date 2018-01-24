const express = require("express")
const router = express.Router()
const logger = require("../logger")
const ArticleRepository = require("../repositories/article")
const { validationResult } = require("express-validator/check")
const { matchedData } = require("express-validator/filter")
const validator = require("../validators/article")

router.get("/", validator.articles, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  const queryData = matchedData(req)
  const limit = queryData.limit
  const firstCursor = queryData.first_cursor

  const articleRepository = new ArticleRepository()
  const articles = await articleRepository.getArticles(limit, firstCursor)
  res.json(articles)
})

// router.get("/:id", async (req, res) => {
//   const id = req.params.id
//   const article = await models.sequelize.query(
//     "SELECT * FROM articles WHERE id = :id ",
//     {
//       replacements: { id: id },
//       type: sequelize.QueryTypes.SELECT
//     }
//   )

//   res.json(article)
// })

module.exports = router
