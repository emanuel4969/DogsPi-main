const axios = require("axios");
const { API_KEY } = process.env;
const { Temperament } = require("../db");

const getTemperaments = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data;
  const temperaments = apiInfo
    .map((d) => d.temperament)
    .join()// toma lista y devuelve cadena 
    .split(",")//toma una cadena , kk,  y devuelve una lista[1, 2,]
    .sort();// ordena alfabeticamente

  await temperaments
    .filter((e, i) => temperaments.indexOf(e) === i)//busca el elemento especificado en una cadena o en una matriz y devuelve el índice de la primera aparición del elemento
    .forEach(
      (t) =>
        t.trim() !== "" && // trim  elimina los espacios en blanco
        Temperament.findOrCreate({
          where: {
            name: t.trim(),// trim elimina espacios en blanco
          },
        })
    );

  const allTemperaments = await Temperament.findAll({ order: [["name"]] });
  return allTemperaments;
};

module.exports = {
  getTemperaments,
};
