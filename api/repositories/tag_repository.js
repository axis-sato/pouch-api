const sequelize = require('sequelize')
const models = require('../models')
const Tag = require('../eintities/tag')

module.exports = class TagRepository {
  async getTags () {
    const sql = `
    SELECT tags.*, count(tags.id) as count
    FROM(
      SELECT t.* 
      FROM tags as t
      INNER JOIN article_tags AS inner_article_tags ON t.id = inner_article_tags.tag_id
    ) AS tags
    INNER JOIN article_tags ON tags.id = article_tags.tag_id
    WHERE tags.deleted_at is NULL
    GROUP BY tags.id
    ORDER BY count desc, tags.updated_at, tags.id desc;
    `

    const tags = await models.sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })

    return tags.map(tag => new Tag(tag))
  }

  async getTagByName (name) {
    const sql = `
    SELECT * FROM tags WHERE name = :name AND deleted_at is NULL
    `

    const tags = await models.sequelize.query(sql, {
      replacements: { name: name },
      type: sequelize.QueryTypes.SELECT
    })

    if (tags.length === 0) {
      return null
    }

    return new Tag(tags[0])
  }

  async addTag (name) {
    const sql = `
    INSERT INTO tags (name) VALUES (:name)
    ON DUPLICATE KEY UPDATE 
    deleted_at=NULL, updated_at=CURRENT_TIMESTAMP
    `

    const result = await models.sequelize.query(sql, {
      replacements: { name: name },
      type: sequelize.QueryTypes.UPDATE
    })

    return result
  }

  async addTags (article_id, tag_id) {
    const sql = `
    INSERT IGNORE INTO article_tags (article_id, tag_id) 
    VALUES(:article_id, :tag_id)
    `

    const result = await models.sequelize.query(sql, {
      replacements: {
        article_id: article_id,
        tag_id: tag_id
      },
      type: sequelize.QueryTypes.DELETE
    })

    return result
  }

  async deleteTags (article_id, ignore_tag_ids) {
    let sql = `DELETE FROM article_tags`
    let additionalSql = ` WHERE`
    if (ignore_tag_ids.length > 0) {
      additionalSql += ` article_tags.tag_id NOT IN (:ignore_tag_ids) AND`
    }
    additionalSql += ` article_tags.article_id = :article_id;`

    sql += additionalSql

    const result = await models.sequelize.query(sql, {
      replacements: {
        article_id: article_id,
        ignore_tag_ids: ignore_tag_ids
      },
      type: sequelize.QueryTypes.DELETE
    })

    return result
  }

  async getTagsByArticleId (article_id) {
    const sql = `
    SELECT tags.*, count(tags.id) as count
    FROM(
	    SELECT t.* 
	    FROM tags as t
      INNER JOIN article_tags AS inner_article_tags ON t.id = inner_article_tags.tag_id 
      AND article_id = :article_id
    ) AS tags
    INNER JOIN article_tags ON tags.id = article_tags.tag_id
    WHERE tags.deleted_at is NULL
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
