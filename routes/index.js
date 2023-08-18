const authRouter = require('./auth/Auth');
const articlesRouter = require('./articles/Articles');

module.exports = (app) => {
  //app.use('/blogs', blogsRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/articles', articlesRouter);
}