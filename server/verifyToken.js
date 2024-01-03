const jwt = require('jsonwebtoken');
const config=require('./config/auth.config')

const checkLogin = (req, res, next) => {
  if (!req.cookies.userlogin) {
    return next(); 
  }

  try {
    const decoded = jwt.verify(req.cookies.userlogin, config.secret);

    req.user = decoded.User; 
    req.id = decoded.User.id; 
    if (decoded && decoded.Role) {
      req.role = decoded.Role.isAdmin; 
    }
    
   } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  
    return next();
  };

module.exports = checkLogin;