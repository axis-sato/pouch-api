const { query } = require("express-validator/check")

module.exports = {
  articles: [
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
  article: []
}
