const TagRepository = require('../repositories/tag_repository')

module.exports = class TagService {
  getTags () {
    const tagRepository = new TagRepository()
    return tagRepository.getTags()
  }
}
