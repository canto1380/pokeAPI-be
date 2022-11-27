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
    await fetch(
      `${process.env.REACT_APP_URL_API_POKE}/pokemon/?limit=10&offset=1`
    )
      .then((resp) => resp.json())
      .then(async (pokemon) => {
        const promises = pokemon.results.map((poke) => {
          return getPokeByName(poke.name);
        });
        const pokeData = await Promise.all(promises);
        signale.success('Successful query')
        res.status(200).send(pokeData);
      });
  } catch (error) {
    signale.error('API query error')
    res.status(400).send({error: error.message, success: false})
  }
};

export const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    await fetch(
      `${process.env.REACT_APP_URL_API_POKE}/pokemon/${id}`
    )
    .then((resp) => resp.json())
    .then(async (pokemon) => {
      signale.success('Pokemon Found')
      res.status(200).send(pokemon)
    });
  } catch (error) {
    signale.error('Pokemon not found')
    res.status(400).send({error: error.message, success: false})
  }
};
