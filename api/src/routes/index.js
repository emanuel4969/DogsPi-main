const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require ('./dogs');
const temperamentRouter = require("./temperaments")
const dogPost = require("./dogSpost")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRouter)
router.use('/temperaments', temperamentRouter)

router.use('/dogs', dogPost)
//router.use("/dogs/:name", dogRouter)  
module.exports = router;
