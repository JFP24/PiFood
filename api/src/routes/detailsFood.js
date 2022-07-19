const { Router } = require("express");
const express = require("express");
const axios = require("axios");
const { Diet, Recipe } = require("../db");
const router = Router();
router.use(express.json());
const API_KEY = "30bbb84e20454f608f82f0e2b6f30eb1"; // Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id.includes("-")) {
      const infoDb = await Recipe.findOne({ where: { id }, include: Diet });

      let detalisDb = {
        //informacion de detalles db
        ID: infoDb.id,
        name: infoDb.name,
        image: infoDb.image,
        healthScore: infoDb.healthScore,
        dishTypes: infoDb.dishTypes,
        diets: infoDb.diets.map((e) => e.name),
        summary: infoDb.summary,
        steps: infoDb.steps,
      };

      return res.status(202).send(detalisDb);
    } else {
      const infoApi = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      // console.log(infoApi.data);
      let detailsApi = {
        //informacion detalles de la api
        name: infoApi.data.title,
        image: infoApi.data.image,
        healthScore: infoApi.data.healthScore,
        dishTypes: infoApi.data.dishTypes,
        diets: infoApi.data.diets,
        sumary: infoApi.data.summary.replace(/<[^>]+>/g, ""),
        steps: infoApi.data.instructions || "none",
      };
      // console.log(detailsApi);
      return res.status(202).send(detailsApi);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error desde DetailsFood");
  }
});

module.exports = router;
