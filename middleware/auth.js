const jwt = require('jsonwebtoken');
const { retrieveUserByEmail } = require('../daos/user');
const secret = 'my super secret';


const isAuthorized = (req, res, next) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
  } else {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (token) {
      jwt.verify(token, secret, (err, decryptedToken) => {
        if (err) {
          res.status(401).send();
        } else {
          req.userData = decryptedToken;
          next();
        }
      });
    } else {
      res.status(401).send();
    }
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const currentUser = await retrieveUserByEmail(req.userData.email);
    const userRoles = currentUser.roles;
    const hasAdminRole = userRoles.includes('admin');
    if (hasAdminRole === true) {
      next()
    } else {
      res.status(403).send();
    }
  } catch (e) {
    next(e)
  }
}

module.exports = { isAuthorized, isAdmin };