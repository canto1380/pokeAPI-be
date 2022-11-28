import fetch from "node-fetch";
import signale from "signale";
globalThis.fetch = fetch;

const getPokeByName = async (name) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_POKE}/pokemon/${name}`
  );
  const data = await response.json();
  return data;
};

export const getPokemon = async (req, res) => {
  try {
    const { page = 1, limit = 12, search = "" } = req.query;
    const offset = (page - 1) * limit;
    await fetch(
      `${process.env.REACT_APP_URL_API_POKE}/pokemon/?limit=${limit}&offset=${offset}`
    )
      .then((resp) => resp.json())
      .then(async (pokemon) => {
        const { count } = pokemon;
        const countPages = count / limit
        const promises = pokemon.results.map((poke) => {
          return getPokeByName(poke.name);
        });
        const pokeData = await Promise.all(promises);
        signale.success("Successful query");
        res.status(200).json({ pokeData, countPages });
      });
  } catch (error) {
    signale.error("API query error");
    res.status(400).send({ error: error.message, success: false });
  }
};

export const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    await fetch(`${process.env.REACT_APP_URL_API_POKE}/pokemon/${id}`)
      .then((resp) => resp.json())
      .then(async (pokemon) => {
        signale.success("Pokemon Found");
        res.status(200).send(pokemon);
      });
  } catch (error) {
    signale.error("Pokemon not found");
    res.status(400).send({ error: error.message, success: false });
  }
};

export const characteristByPokemon = async (req, res) => {
  try {
    const { id } = req.params;
    await fetch(`${process.env.REACT_APP_URL_API_POKE}/characteristic/${id}`)
      .then((resp) => resp.json())
      .then(async (descriptions) => {
        signale.success("Pokemon Found");
        res.status(200).send(descriptions);
      });
  } catch (error) {
    signale.error("Pokemon not found");
    res.status(400).send({ error: error.message, success: false });
  }
};
