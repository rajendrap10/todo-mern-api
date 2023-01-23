const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

/*
    @@ Function : Register [User Registration API]
    @@ Description : Creating a api for registering a new user
*/

exports.register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    };

    const result = await User.create(user);

    if (result) {
      result.password = null;
      res.status(200).send({
        success: true,
        message: "User has been registered.",
        data: result,
      });
    } else {
      res.status(401).send({
        success: false,
        message: err,
        data: null,
      });
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: error,
      data: null,
    });
  }
};

/*
    @@ Function : checkUser [Checking Unique User]
    @@ Description : Creating a api for checking uniqe email id for registration
*/

exports.checkUser = async (req, res) => {
  try {
    User.find({ email: req.body.email }, function (err, docs) {
      if (docs.length) {
        return res.status(200).send({
          success: false,
          message: "User already exist",
          data: null,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "User is not exist",
          data: null,
        });
      }
    });
  } catch (error) {
    console.log("inside catch error");
    return res.status(401).send({
      success: false,
      message: error,
      data: null,
    });
  }
};

/*
    @@ Function : login [Checking User email & password]
    @@ Description : Creating a api for checking user email & password
*/

exports.login = async (req, res) => {
  try {
    User.find({ email: req.body.email }, function (err, result) {
      if (result.length) {

        console.log(result);
        let userPassword = result[0].password;
        let userEmail = result[0].email;
        
        bcrypt.compare(req.body.password, userPassword)
        .then((compResult) => {
          if (!compResult) {
            res.status(200).send({
              success: false,
              message: "Invalid Password !",
              data: null,
            });
          }

          var privateKey = process.env.JWTKEY;
          const jwtExpirySeconds = 1800;

          jwt.sign(
            { _id:result[0]._id, email: userEmail },
            privateKey,
            { algorithm: "HS256", expiresIn: jwtExpirySeconds },
            function (tokenErr, token) {
              if (token) {
                res
                  .cookie("access_token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: jwtExpirySeconds*1000,
                  })
                  .status(200)
                  .json({
                    success: true,
                    token,
                    message: "Logged in successfully 😊 👌",
                  });
              } else {
                res.status(200).send({
                  success: false,
                  message: "Token not available !",
                  data: null,
                });
              }
            }
          );
          // Send JWT

        }).catch((dberr) => {
            console.log(dberr);
        })
      } else {
        res.status(200).send({
          success: false,
          message: 'Invalid Email Id !',
          data: null,
        });    
      }
    });
  } catch (error) {
    console.log("inside catch error");
    res.status(401).send({
      success: false,
      message: error,
      data: null,
    });
  }
};
