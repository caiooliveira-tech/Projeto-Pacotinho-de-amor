const router = require('express').Router();
const { getAll, getById, create, update, remove } = require('../controllers/fairsController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', auth, upload.single('cover_photo'), create);
router.put('/:id', auth, upload.single('cover_photo'), update);
router.delete('/:id', auth, remove);

module.exports = router;
