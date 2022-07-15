// const { Router } = require("express");
// const express = require("express");
// const axios = require("axios");
// const { Diet, Recipe } = require("../db");
// const router = Router();
// router.use(express.json());
// const API_KEY = "988fb190941c4c35a854ca48e5213175";
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

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
