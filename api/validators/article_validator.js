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
  update_read: [
    param("id")
      .exists()
      .isInt({ min: 1 })
      .withMessage("limit must be integer (1 or more).")
      .toInt(),
    body("read")
      .exists()
      .isBoolean()
      .withMessage("read must be boolean.")
      .toBoolean()
  ]
}
