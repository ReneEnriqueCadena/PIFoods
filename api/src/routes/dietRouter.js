const { Router } = require('express');
const { getAllDiets } = require('../controllers/dietController')
const router = Router();

router.get('/', getAllDiets)

module.exports = router;