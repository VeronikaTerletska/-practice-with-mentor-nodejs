const express = require("express");

const filmsRouter = express.Router();

const filmsController = require("../controllers/FilmsController");

// http://localhost:5050/api/v1/films
// Додати фільм
filmsRouter.post(
  "/films",
  (req, res, next) => {
    console.log("Worked Joi");
    next();
  },
  filmsController.add
);

// Отримати один фільм
filmsRouter.get("/films/:id", filmsController.getOne);

// Отримати всі фільми
filmsRouter.get("/films", filmsController.getAll);

// Обновити один фільм
filmsRouter.put("/films/:id", filmsController.updateOne);

// Видалити фільм
filmsRouter.delete("/films/:id", filmsController.removeOne);

module.exports = filmsRouter;
