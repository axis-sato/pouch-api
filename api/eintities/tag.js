module.exports = class Tag {
  constructor(tag) {
    this.id = tag.id
    this.name = tag.name
    this.count = tag.count
    this.created_at = tag.created_at
    this.updated_at = tag.updated_at
  }
}
