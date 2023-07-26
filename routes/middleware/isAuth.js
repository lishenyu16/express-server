const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: 'Not authorized.'
    })
  }

  const token = authHeader.split(' ')[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, 'somereallylongsecret');
  }
  catch (err) {
    console.log(err);
    if (err.name == 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'Token expired'
      })
    }
    if (err.name == 'JsonWebTokenError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid token'
      })
    }

  }
  if (!decodeToken) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token or expired',
    })
  }
  req.userId = decodeToken.userId;
  next();
}