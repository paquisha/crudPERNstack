const { Router } = require("express");

const { loginCtrl } = require('../controllers/auth.controller')

const router = Router();

router.post('./login', loginCtrl)

module.exports = router