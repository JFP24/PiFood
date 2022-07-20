require("dotenv").config();
const { Router } = require("express");
const router = Router();

//Importo todos los routers;
const recipes = require("./recipes");
const postFood = require("./postFood");
const diets = require("./diets");
const detailsFood = require("./detailsFood");

//Configuro todos los routers
router.use("/", recipes);
router.use("/", postFood);
router.use("/", diets);
router.use("/", detailsFood);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

