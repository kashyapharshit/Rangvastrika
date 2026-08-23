const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const validate = require('../middleware/validateMiddleware');
const { registerUserSchema, loginUserSchema } = require('../validators/user.validator');

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginUserSchema), loginUser);

module.exports = router;
