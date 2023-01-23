const jwt = require("jsonwebtoken");
const { getToken } = require("../helpers/utility");
const config = process.env;
User = require("../models/userModel");

const verifyToken = (req, res, next) => {
    const token = getToken(req);
  if (token) {
    jwt.verify(token, config.JWTKEY, function (err, decode) {
      if (err){
        return res.status(401).send('Invalid Access !');
      }

      User.findOne({
        _id: decode._id,
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({
            message: err,
          });
        } else {
            let userCred = {
                _id:user._id,
                email:user.email
            }
          req.userCred = userCred;
          next();
        }
      });
    });
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;