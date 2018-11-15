const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({
      error: 'not-found'
    });
  }
});

// // Route '/auth/login' - handles the login process
router.post('/login', (req, res, next) => {
  // Protection: if user is already logged in
  if (req.session.currentUser) {
    return res.status(401).json({
      error: 'unauthorized'
    });
  }
 
  // Protection: if username or password are empty
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({
      error: 'validation'
    });
  }
 
  // Check if user has logged in correctly
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'not-found'
        });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      }
      return res.status(404).json({
        error: 'not-found'
      });
    })
    .catch(next);
 });

router.post('/', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({
      error: 'unauthorized'
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: 'validation'
    });
  }

  User.findOne({
      username
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'not-found'
        });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      }
      return res.status(404).json({
        error: 'not-found'
      });
    })
    .catch(next);
});

router.post('/addcontact', (req,res,next) => {
  const {contact, user} = req.body;
  find= User.filter(username= contact)

  return res.status(200).json(find);
})


router.post('/signup', (req, res, next) => {
  const {
    username,
    password,
    email,
    phone,
    avatar
  } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: 'empty'
    });
  }

  User.findOne({
      username
    }, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({
          error: 'username-not-unique'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        password: hashPass,
        phone,
        email,
        avatar,
      });

      return newUser.save().then(() => {
        req.session.currentUser = newUser;
        res.json(newUser);
      });
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

router.get('/dashboard', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
