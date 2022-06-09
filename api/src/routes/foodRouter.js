const { Router } = require('express');
const { getAllFoods, getFoodById } = require('../controllers/foodController')
const router = Router();

router.get('/', getAllFoods)

router.get('/:id', getFoodById)

module.exports = router;