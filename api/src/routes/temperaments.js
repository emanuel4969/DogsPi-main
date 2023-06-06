const { Router } = require("express");
const { getTemperaments } = require("../controller/temperacontroller");
const temperamentRouter = Router();

temperamentRouter.get("/", async (req, res) => {
  try {
    const dbTemperaments = await getTemperaments();
    res.status(200).json(dbTemperaments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = temperamentRouter;  
