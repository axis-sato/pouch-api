const sequelize = require("sequelize")
const models = require("../models")
const Tag = require("../eintities/tag")
const logger = require("../logger")

module.exports = class TagRepository {
  constructor() {}

  async getTags() {
    const sql = `
    SELECT tags.*, count(tags.id) as count
    FROM(
	   SELECT t.* 
	    FROM tags as t
	    INNER JOIN article_tags AS inner_article_tags ON t.id = inner_article_tags.tag_id
    ) AS tags
    INNER JOIN article_tags ON tags.id = article_tags.tag_id
    GROUP BY tags.id
    ORDER BY count desc, tags.updated_at, tags.id desc;
    `

    const tags = await models.sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })

    return tags.map(tag => new Tag(tag))
  }

  async getTagsByArticleId(article_id) {
    const sql = `
    SELECT tags.*, count(tags.id) as count
    FROM(
	    SELECT t.* 
	    FROM tags as t
      INNER JOIN article_tags AS inner_article_tags ON t.id = inner_article_tags.tag_id 
      AND article_id = :article_id
    ) AS tags
    INNER JOIN article_tags ON tags.id = article_tags.tag_id
    GROUP BY tags.id
    ORDER BY tags.updated_at desc, tags.id desc;
    `
    const tags = await models.sequelize.query(sql, {
      replacements: { article_id: article_id },
      type: sequelize.QueryTypes.SELECT
    })

    return tags.map(tag => new Tag(tag))
  }
}
