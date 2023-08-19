const express = require('express');
const db = require('../../config/db');
const winston = require('../middleware/logger');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.delete('/deleteArticle', isAuth, async (req, res) => {
  try {
    const { userId } = req;
    const { articleId } = req.body;
    const query_sql = `select author_id from articles where article_id = $1`;
    const res1 = await db.query(query_sql, articleId);
    if (res1.rows.length && res1.rows[0].author_id === userId) {
      const sql = `delete from articles where article_id = $1`;
      await db.query(sql, articleId);
      return res.status(200).json({
        success: true,
        message: 'Successfully deleted the article'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Article doesn not exist or you are not authorized to edit this article'
      });
    }
  } catch (err) {
    winston.error(err);
    return res.status(400).json({
      success: false,
      message: 'Failed to edit this article.'
    });
  }
});

router.post('/editArticle', isAuth, async (req, res) => {
  try {
    const { userId } = req;
    const { articleId, title, keywords, description, img_url, content } = req.body;
    const query_sql = `select author_id from articles where article_id = $1`;
    const res1 = await db.query(query_sql, articleId);
    if (res1.rows.length === 0 || res1.rows[0].author_id !== userId) {
      return res.status(401).json({
        success: false,
        message: 'Article doesn not exist or you are not authorized to edit this article'
      });
    }

    const update_sql = `
      update articles 
      set title = $1, keywords = $2, last_modified = current_timestamp, description = $3, img_url = $4, content = $5
      where article_id = $6
      `;
    await db.query(update_sql, [title, keywords, description, img_url, content]);
    return res.status(200).json({
      success: true,
      message: 'Successfully saved the article'
    });
  } catch (err) {
    winston.error(err);
    return res.status(400).json({
      success: false,
      message: 'Failed to edit this article.'
    });
  }
});

router.post('/saveArticle', isAuth, async (req, res) => {
  try {
    const { userId, username } = req;
    const { title, keywords, description, content, img_url } = req.body;
    const insertSql = `insert into articles(title, keywords, author, created_on, last_modified, description, img_url, content, author_id,) 
    values($1, $2, $3, current_timestamp, current_timestamp, $4, $5, $6, $7) returning article_id`;

    const result = await db.query(insertSql, [title, keywords, username, description, img_url, content, userId]);

    return res.status(200).json({
      success: true,
      message: 'Saved article',
      article_id: result.rows[0].article_id,
    });
  } catch (err) {
    console.log(err);
    winston.error(err);
    res.status(400).json({
      success: false,
      message: 'Server encountered an error to save the article'
    })
  }
});

router.get('/getArticleById/:article_id', async (req, res) => {
  try {
    const article_id = req.params.article_id;
    const query = `select * from articles where article_id = $1`;
    const { rows } = await db.query(query, [article_id]);
    return res.status(200).json({
      success: true,
      message: 'Article is found',
      article: rows[0],
    });
  } catch (err) {
    console.log(err);
    winston.error(err);
    res.status(400).json({
      success: false,
      message: 'Failed to get the artile',
      err
    });
  }
});

router.get('/articles', async (req, res) => {
  try {
    const sql = 'select * from articles order by created_on desc limit 20';
    const { rows } = await db.query(sql);
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched top 20 articles',
      articles: rows
    })
  } catch (err) {
    console.log(err);
    winston.error(err);
    return res.status(400).json({
      success: false,
      message: 'Failed to get articles.'
    });
  }
});

module.exports = router;
