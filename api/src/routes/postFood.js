const { Router } = require("express");
const express = require("express");
const axios = require("axios");
const { Diet, Recipe } = require("../db");
const router = Router();
router.use(express.json());
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.post("/recipe", async (req, res) => {
  try {
    const { name, image, summary, healthScore, steps, dishTypes, diets } =
      req.body; //me llega por el formulario
    const recipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
      dishTypes,
    });
    const dietsDb = await Diet.findAll({
      where: { name: diets }, //donde el name coincida con los diets que me pasan
    });
    await recipe.addDiet(dietsDb);

    console.log(recipe);
    return res.status(202).send(recipe);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
