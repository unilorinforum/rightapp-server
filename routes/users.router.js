const router = require('express').Router();
const {
  createUser,
  userLogin,
  getAllUsers,
} = require('../controller/users.controller');

router.post('/register', createUser);
router.post('/login', userLogin);
router.get('/', getAllUsers);

module.exports = router;
