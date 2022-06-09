const { Router } = require('express');
const { postNewFood } = require('../controllers/foodPostController')
const router = Router();

router.post('/', postNewFood)

module.exports = router;