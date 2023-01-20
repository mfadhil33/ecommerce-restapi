const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('"x-auth-token"');
  if (authHeader) {
    const token = authHeader.split('')[1];
    jwt.verify(token, process.env.JWT_SECURE, (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid');
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: 'u are not authenticated!',
    });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        messsage: 'you are not allowed to do that!',
      });
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAuthorization };
