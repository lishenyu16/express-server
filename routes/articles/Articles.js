const express = require('express');
const db = require('../../config/db');
const winston = require('../middleware/logger');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post('/saveArticle', isAuth, async (req, res) => {
  try {
    const { userId, username } = req;
    const { title, keywords, description, content, img_url } = req.body;
    const insertSql = `insert into articles(title, keywords, author, created_on, last_modified, description, img_url, content) 
    values($1, $2, $3, current_timestamp, current_timestamp, $4, $5, $6) returning article_id`;

    const result = await db.query(insertSql, [title, keywords, username, description, img_url, content]);

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
    const sql = 'select * from articles limit 20';
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
