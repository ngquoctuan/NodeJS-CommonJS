const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save user to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign({
      id: user.id,
      admin: user.admin,
    },
      process.env.secretKey,
      { expiresIn: "1m" }
    );
  },

  //GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign({
      id: user.id,
      admin: user.admin,
    },
      process.env.alternatveSecretKey,
      { expiresIn: "365d" }
    );
  },
  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Wrong username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: false,
          secure: false,
          path: "/",
          sameSite: "strict"
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },



  reqRefreshToken: async (req, res) => {
    // TAKE REFRESH TOKEN FROM USER 
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're now authentificated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is now valid");
    }
    jwt.verify(refreshToken, process.env.alternatveSecretKey, (err, user) => {
      if (err) {
        console.log(err);
      }

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);



      //CREATE NEW ACCESSTOKEN, REFRESH TOKEN
      const newAccessToken = authController.generateAccessToken(user);

      const newRefreshToken = authController.generateRefreshToken(user);

      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: "strict"
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
    //refreshToken: newRefreshToken 
  }
}

//STORE 

module.exports = authController;
