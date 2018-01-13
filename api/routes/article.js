const express = require("express")
const router = express.Router()
const models = require("../models")
const logger = require("../logger")
const sequelize = require("sequelize")

router.get("/", async (req, res) => {
  const articles = await models.sequelize.query("SELECT * FROM articles", {
    type: sequelize.QueryTypes.SELECT
  })
  res.json(articles)
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const article = await models.sequelize.query(
    "SELECT * FROM articles WHERE id = :id ",
    {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT
    }
  )

  res.json(article)
})

module.exports = router
