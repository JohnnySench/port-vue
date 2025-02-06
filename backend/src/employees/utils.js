const jwt = require('jsonwebtoken')

const signatureAccess = 'MySuP3R_z3kr3t_access'

const verifyUsersMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  if (!token) {
    console.log('No Token provided');
    return res.sendStatus(401)
  }
  try {
    const decoded = jwt.verify(token, signatureAccess);
    req.user = decoded;
  } catch (err) {
    return res.sendStatus(401)
  }
  return next();
}

module.exports = {
  verifyUsersMiddleware,
}