const { query, param, body } = require("express-validator/check")

module.exports = {
  get_articles: [
    query("limit")
      .exists()
      .withMessage("limit is required.")
      .isInt({ min: 1 })
      .withMessage("limit must be integer (1 or more).")
      .toInt(),
    query("first_cursor")
      .exists()
      .withMessage("first_cursor is required.")
      .isInt({ min: 1 })
      .withMessage("first_cursor must be integer (1 or more).")
      .toInt()
  ],
  create_article: [
    body("url")
      .exists()
      .isURL()
      .withMessage("url must be URL format.")
  ],
  update_article: [
    param("id")
      .exists()
      .isInt({ min: 1 })
      .withMessage("id must be integer (1 or more).")
      .toInt(),
    body("url")
      .exists()
      .isURL()
      .withMessage("url must be URL format."),
    body("tags")
      .exists()
      .custom(value => Array.isArray(value))
      .withMessage("tags must be array."),
    body("comment").exists()
  ],
  update_tags: [
    param("id")
      .exists()
      .isInt({ min: 1 })
      .withMessage("id must be integer (1 or more).")
      .toInt(),
    body("tags")
      .exists()
      .custom(value => Array.isArray(value))
      .withMessage("tags must be array.")
  ],
  update_comment: [
    param("id")
      .exists()
      .isInt({ min: 1 })
      .withMessage("id must be integer (1 or more).")
      .toInt(),
    body("comment").exists()
  ],
  update_read: [
    param("id")
      .exists()
      .isInt({ min: 1 })
      .withMessage("id must be integer (1 or more).")
      .toInt(),
    body("read")
      .exists()
      .isBoolean()
      .withMessage("read must be boolean.")
      .toBoolean()
  ],
  delete_article: [
    param("id")
      .exists()
      .isInt({ min: 1 })
      .withMessage("id must be integer (1 or more).")
      .toInt()
  ]
}
