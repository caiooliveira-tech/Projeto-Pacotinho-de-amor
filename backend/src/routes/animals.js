const router = require('express').Router();
const { getAll, getById, create, update, remove, getStats } = require('../controllers/animalsController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/stats', getStats);
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', auth, upload.single('photo'), create);
router.put('/:id', auth, upload.single('photo'), update);
router.delete('/:id', auth, remove);

module.exports = router;
