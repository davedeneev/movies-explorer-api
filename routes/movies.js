const router = require('express').Router();
const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validation');
const {
  addMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateAddMovie, addMovie);
router.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
