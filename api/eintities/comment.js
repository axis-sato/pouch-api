module.exports = class Comment {
  constructor(comment) {
    this.id = comment.id
    this.body = comment.body
    this.created_at = comment.created_at
    this.updated_at = comment.updated_at
  }
}
