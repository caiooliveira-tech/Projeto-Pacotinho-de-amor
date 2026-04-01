const router = require('express').Router();
const { login, me, changePassword } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', auth, me);
router.put('/change-password', auth, changePassword);

module.exports = router;
