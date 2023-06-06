const { Router } = require("express");
const dogRouter = Router();
const { allInfo} = require("../controller/dogcontroller");


dogRouter.get("/", async (req, res) => {
  const name = req.query.name;
  const apiDog = await allInfo();
  try {
    if (name) {
      const searchName = await apiDog.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())

      );
      searchName.length
        ? res.status(200).json(searchName)// si hay name devolvelo
        : res.status(404).send("The requested breed of dog was not found");
    } else {
      res.status(200).json(apiDog);//si no hay name devolve todos los perros 
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

dogRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allId = await allInfo();
  try {
    if (!id){
     res.status(404).send("The requested breed of dog was not found");
    }else{
      const searchId = await allId.find(e => e.id.toString() === id);
      res.status(200).json(searchId);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

/*dogRouter.get("/dogs/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const dog = await dog.findAll({
      where: {
        name: name,
      },
    });
    if (dog.length) {
      return res.json(dogs);
    } else {
      return res.status(404).json({ error: "No se encontró ningún perro con ese nombre" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
});*/

module.exports = dogRouter;




