const router = require('express').Router();
const { addUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateAddUser } = require('../middlewares/validation');
const NotFoundError = require('../utils/errors/not-found-err');

router.post('/signin', validateLogin, login);
router.post('/signup', validateAddUser, addUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
