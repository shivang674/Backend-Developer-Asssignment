const jwt = require('jsonwebtoken');
const auth = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(decoded.role)) return res.status(403).json({ msg: 'Forbidden' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
module.exports = auth;