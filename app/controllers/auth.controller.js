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

      const accessToken = jwt.sign({
        id: user.id,
        isAdmin: user.isAdmin,
      });
      res.status(200).json({
        other,
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
module.exports = { registController, loginController };
