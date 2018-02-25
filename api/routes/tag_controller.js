const express = require('express')
const router = express.Router()
const TagService = require('../services/tag_service')

router.get('/', async (req, res) => {
  const tagService = new TagService()
  const tags = await tagService.getTags()
  res.json(tags)
})

module.exports = router
