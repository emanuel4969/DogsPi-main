const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const dogRouter = Router();

dogRouter.post("/", async (req, res) => {
  const {
    name,
    min_height,
    max_height,
    min_weight,
    max_weight,
    life_span,
    image,
    temperament,
    createdInDb,
  } = req.body;
  try {
    
      
      const newDog = await Dog.create({
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        image,
        createdInDb,
      });
      const createdDb = await Temperament.findAll({
        where: { name: temperament },
      });
      console.log(name);
      newDog.addTemperament(createdDb);
      return res.status(200).send("Dog Created");
    
    } catch (error) {
    return res.status(404).send("Dog Not Created");    
  }
});


dogRouter.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id) {
      await Dog.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ success: "Dog succesfully deleted!" });
    }
  } catch (error) {
    res.send(400).json({ error: error.message });
  }
});
  



module.exports = dogRouter;