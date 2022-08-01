const { Router } = require("express");
const express = require("express");
const axios = require("axios");
const { Diet, Recipe } = require("../db");
const router = Router();
router.use(express.json());
const API_KEY = "e104c6d8b285449bb0f9651d05939027";
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const infoApi = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=20`
      );
      //traemos la informacion de la api
      let infoRecipes = infoApi.data.results.map((data) => {
        return {
          id: data.id,
          image: data.image,
          name: data.title,
          diets: data.diets || data.diets.map((e) => e.name),
          healthScore: data.healthScore,
        };
      });
      //traemos la informacion de la db
      let infoDb = await Recipe.findAll({
        //traigo un arreglo
        include: Diet,
        atribute: {
          name: "name",
        },
      });
      console.log(infoDb);
      //mapeo el arreglo que llega de la db y accedo a las propiedades que necesito
      let db = infoDb.map((e) => {
        return {
          id: e.id,
          image: e.image,
          name: e.name,
          summary: e.summary,
          diets: e.diets.map((e) => e.name), //las dietas son un arreglo accedo a la propiedad name
          healthScore: e.healthScore,
          creado: e.creado,
        };
      });
      //concateno la informacion de la db a la api
      let allData = infoRecipes.concat(db);
      res.status(202).send(allData);
    }
    //si llega query name
    if (name) {
      //primero buscamos si tenemos en la base de datos donde el nombre coincida
      const infoDb = await Recipe.findOne({
        where: {
          name: name,
        },
        include: Diet,
      });
      //si coincide mandamos la informacion
      if (infoDb) {
        const api = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=10&apiKey=${API_KEY}`
        );
        const infoFood = api.data.results.map((data) => {
          return {
            id: data.id,
            image: data.image,
            name: data.title,
            dishTypes: data.dishTypes,
            diets: data.diets,
            healthScore: data.healthScore,
          };
        });

        let infoFoodDb = [
          {
            id: infoDb.id,
            name: infoDb.name,
            diets: infoDb.diets.map((e) => e.name),
            healthScore: infoDb.healthScore,
            image: infoDb.image,
          },
        ];
        let allData = infoFoodDb.concat(infoFood);
        res.status(202).send(allData);
      } else {
        const api = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=10&apiKey=${API_KEY}`
        );
        console.log(api.data.results);
        const infoFood = api.data.results.map((data) => {
          return {
            id: data.id,
            image: data.image,
            name: data.title,
            dishTypes: data.dishTypes,
            diets: data.diets,
            healthScore: data.healthScore,
          };
        });
        return res.status(202).send(infoFood);
      }
    }
  } catch (error) {
    console.log(error, "desde recipes");
  }
});

module.exports = router;
