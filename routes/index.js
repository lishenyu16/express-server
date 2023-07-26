const authRouter = require('./auth/Auth');

module.exports = (app) => {
  //app.use('/blogs', blogsRouter);
  app.use('/api/auth', authRouter);
}