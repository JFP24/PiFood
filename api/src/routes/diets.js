const { Router } = require("express");
const express = require("express");
const axios = require("axios");
const { Diet, Recipe } = require("../db");
const router = Router();
router.use(express.json());
const API_KEY = "e104c6d8b285449bb0f9651d05939027";
const URL = "https://api.spoonacular.com";
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/diets", async (req, res) => {
  // try {
  //   const apiInfo = await axios.get(
  //     `${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  //   );
  //   let apiDiets = apiInfo.data.results.map((el) => el.diets);
  //   apiDiets = [...new Set(apiDiets.flat()), "vegetarian"];
  //   apiDiets.map((e) => {
  //     return Diet.findOrCreate({ where: { name: e } });
  //   });
  //   let dataDb = await Diet.findAll();
  //   res.status(202).send(dataDb);
  //   console.log(apiDiets);
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const diets = [
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan",
      "paleolithic",
      "primal",
      "whole 30",
      "pescatarian",
      "ketogenic",
      "fodmap friendly",
      "vegetarian",
    ];
    diets.map((e) => {
      return Diet.findOrCreate({ where: { name: e } });
    });
    let allDb = await Diet.findAll();
    res.status(202).send(allDb);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// try {
//   const diets = [
//     "gluten free",
//     "ketogenic",
//     "vegetarian",
//     "lacto vegetarian",
//     "ovo vegetarian",
//     "vegan",
//     "pescetarian",
//     "paleo",
//     "primal",
//     "whole30",
//     "dairy Free",
//     "paleolithic",
//   ];
//   diets.map((e) => {
//     return Diet.findOrCreate({ where: { name: e } });
//   });
//   let allDb = await Diet.findAll();
//   res.status(202).send(allDb);
// } catch (error) {
//   console.log(error);
// }

// for (let i = 0; i < apiDiets.length; i++) {
//   await Diet.findOrCreate({ where: { name: apiDiets[i] } });
// }
