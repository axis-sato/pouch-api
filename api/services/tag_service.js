const TagRepository = require("../repositories/tag_repository")

module.exports = class TagService {
  constructor() {}

  getTags() {
    const tagRepository = new TagRepository()
    return tagRepository.getTags()
  }
}
