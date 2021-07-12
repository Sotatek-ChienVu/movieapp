const Login = require("../models/login-model");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const accountService = require("../service");
const lodash = require("lodash");
const { deflateSync } = require("zlib");
// const sendMail = require('_helpers/send-email');
CreateLogin = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      status: "ERROR",
      message: "Username an password is not null",
    });
  }

  Login.findOne({ username: req.body.username }, (err, login) => {
    if (err) {
      return res
        .status(201)
        .json({ status: "ERROR", message: "Login fail", error: err });
    }
    if (!login) {
      return res.status(403).json({ status: "ERROR", message: "Fail" });
    }
    while (
      login.username === body.username &&
      login.password === body.password
    ) {
      return res
        .status(200)
        .json({
          status: "SUCCESS",
          message: "Login success",
          accessToken: login.accessToken,
          userId: login._id,
          rule: login.rule,
        });
    }
    return res.status(401).json({ status: "ERROR", message: "Login fail" });
  });
};

Register = (req, res) => {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ status: "ERROR", message: "Body is not null" });
  }
  Login.findOne({ username: body.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ status: 'ERROR', message: err });
    }
    if (user) {
      return res.status(200).json({ status: 'ERROR', message: 'Email này đã được đăng ký' });
    }
    const accessToken = jwt.sign(
      { username: body.username },
      accessTokenSecret
    );
    const login = new Login({
      ...body,
      accessToken,
      rule: 1,
      resetToken: { token: "", expires: "" },
    });
    if (!login) {
      return res.status(400).json({ status: "ERROR", message: error });
    }

    console.log(login)
    login
      .save()
      .then(() => {
        return res.status(200).json({
          id: login._id,
          accessToken: login.accessToken,
          rule: login.rule,
          status: "SUCCESS",
          message: "Register success",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Register fail!",
        });
      });
  })

};

ForgotPassword = async (req, res) => {
  Login.findOne({ username: req.body.username }, (err, account) => {
    if (err) {
      return res.status(400).json({ status: "ERROR", message: err });
    }
    if (!account) {
      return res
        .status(200)
        .json({
          status: "ERROR",
          message: "Not account width username request",
        });
    }
    if (account) {
      accountService
        .forgotPassword(req.body.username, req.get("origin"))
        .then(() =>
          res.json({
            status: "SUCCESS",
            message: "Please check your email for password reset instructions",
          })
        )
        .catch((err) => {
          return res.status(400).json({ status: "ERROR", message: err });
        });
    }
  });
};

updateAccount = async (req, res) => {
  console.log(req.body)
  const code = req.body.code;
  Login.findOne({ 'resetToken.token': code }, (err, account) => {
    console.log(account, 'account')
    if (err) {
      return res.status(400).json({ status: 'ERROR', message: err })
    }
    if (!account || account.length < 1) {
      return res.status(200).json({ status: 'ERROR', message: 'Not account', data: [] })

    }

    console.log(account.resetToken.expires)

    if (account.resetToken.expires - Date.now() > 0) {
      account.password = req.body.password;
      account
        .save()
        .then(() => {
          return res.status(200).json({ status: 'SUCCESS', message: 'Update password success' })
        })
        .catch((error) => {
          return res.status(400).json({ status: 'ERROR', message: error });
        })
    }
    else return res.status(400).json({ status: 'ERROR', message: 'Code update account expired!' });
  })
};

searchAccount = async (req, res) => {
  const result = [];
  const keySearch = req.params.search;
  console.log(keySearch)
  await Login.find({}, (err, order) => {
    if (err) {
      return res.status(400).json({ status: 'ERROR', message: err })
    }
    if (!order || order.length < 1) {
      return res.status(200).json({ status: 'SUCCESS', message: 'Order width name not found', data: [] })
    }
    if (order) {
      order?.forEach((el) => {
        if (
          el.username.toLowerCase().includes(keySearch.toLowerCase()) ===
          true
        ) {
          result.push(el);
        }
      });
      if (result.length > 0) {
        return res
          .status(200)
          .json({ status: "SUCCESS", message: "Search Success", result });
      }
      if (!result.length)
        res
          .status(200)
          .json({
            status: "ERROR",
            message: "No result search",
            errorCode: "ERROR.SEARCH.NOT.FOUND",
            result: [],
          });
    }
  })
}

getAccount = (req, res) => {
  Login.find({}, (err, account) => {
    if (err) {
      return res.status(400).json({ status: "ERROR", message: err });
    }
    if (!account || account.length < 1) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Account not found" });
    }
    return res.status(200).json({ status: "SUCCESS", data: account });
  });
};

deleteAccount = (req, res) => {
  Login.findOne({ _id: req.params.id }, (err, account) => {
    if (err) {
      return res.status(400).json({ status: "ERROR", message: err });
    }
    if (!account) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Account not found" });
    }
    account
      .delete()
      .then(() => {
        return res
          .status(200)
          .json({ status: "SUCCESS", message: "Delete success" });
      })
      .catch((err) => {
        return res.status(400).json({ status: "ERROR", message: err });
      });
  });
};

editAccount = (req, res) => {
  const body = req.body;
  Login.findOne({ _id: body.id }, (err, account) => {
    if (err) {
      return res.status(400).json({ status: "ERROR", message: err });
    }
    if (!account) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Account not found " });
    }
    account.username = body.username;
    account.password = body.password;
    account.rule = body.rule;
    account
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ status: "SUCCESS", message: "Edit account success" });
      })
      .catch((err) => {
        return res.status(400).json({ status: "ERROR", message: err });
      });
  });
};

getProfile = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  if (!userId) {
    return res.status(400).json({
      status: 'ERROR',
      message: "User id is required"
    })
  }
  await Login.findOne({ _id: userId }, (err, user) => {
    if (err) {
      return res.status(400).json({ status: 'ERROR', message: err });
    }
    if (!user || user.length < 1) {
      return res.status(200).json({ status: 'SUCCESS', message: "Not found with id user", data: {} });
    }
    let { password, accessToken, ...profile } = user._doc;
    console.log(profile)
    return res.status(200).json({ status: "SUCCESS", data: profile })
  })
}

module.exports = {
  CreateLogin,
  Register,
  ForgotPassword,
  getAccount,
  deleteAccount,
  editAccount,
  updateAccount,
  searchAccount,
  getProfile
};
