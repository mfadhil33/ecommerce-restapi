const CryptoJs = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { db } = require('../models');

dotenv.config();
// registrasi
const registController = async (req, res) => {
  const { username, email, password } = req.body;
  const encryptPass = CryptoJs.AES.encrypt(password, process.env.PASSWORD_SEC).toString();
  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Silahkan masukkan username,email dan password terlebih dahulu',
    });
  }
  const newUser = new db.Users({
    username,
    email,
    password: encryptPass,

  });
  await newUser.save().then((result) => {
    if (result) {
      res.status(201).json({
        message: 'Registry was succesfully',
      });
    }
  }).catch((err) => {
    res.status(500).json({
      message: err.message,
    });
  });
};

// login
const loginController = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await db.Users.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: 'Wrong credential!',
      });
    }
    const decryptPass = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD_SEC);
    const originalPass = decryptPass.toString(CryptoJs.enc.Utf8);
    if (req.body.password === originalPass) {
      const { password, ...other } = user._doc;
      // eslint-disable-next-line prefer-const
      let refreshTokens = [];
      // send jwt access token
      const accessToken = await jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECURE,
        { expiresIn: '3d' },
      );

      // refresh token

      const refreshToken = await jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_REFRESH,
        { expiresIn: '1m' },
      );

      // set refresh token in refreshTokens array
      refreshTokens.push(refreshToken);

      res.status(200).json({
        ...other,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({
        message: 'Wrong credentials!',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// create new access tokken from refresh token
const refreshTokenn = async (req, res) => {
  const refreshToken = req.header('x-auth-token');
  // eslint-disable-next-line prefer-const
  let refreshTokens = [];
  // if token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          message: 'Toket not found',
        },
      ],
    });
  }

  // if token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [

        {
          message: 'Invalid refresh token',
        },
      ],
    });
  }

  try {
    const user = await jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH,
    );
    // eslint-disable-next-line no-unused-vars
    const { id, isAdmin } = user;
    const accessToken = await jwt.sign(
      {
        id,
        isAdmin,
      },
      process.env.JWT_SECURE,
      { expiresIn: '10s' },
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          message: 'Invalid Token',
        },
      ],
    });
  }
};

// deauthenticate - logout
// delete refresh token
// eslint-disable-next-line no-unused-vars
// const Deauthenticate = async();

module.exports = { registController, loginController };
