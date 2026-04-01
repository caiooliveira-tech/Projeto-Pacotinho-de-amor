const router = require('express').Router();
const { getAll, create, update, remove } = require('../controllers/storiesController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getAll);
router.post('/', auth, upload.single('photo'), create);
router.put('/:id', auth, upload.single('photo'), update);
router.delete('/:id', auth, remove);

module.exports = router;
