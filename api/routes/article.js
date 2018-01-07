const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    message: "articles"
  })
})

router.get("/:id", (req, res) => {
  res.json({
    message: "article"
  })
})

module.exports = router
