const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const diet = require('./dietRouter');
const food = require('./foodRouter');
const foodPost = require('./foodPostRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', food);
router.use('/recipe', foodPost);
router.use('/types', diet);

module.exports = router;
