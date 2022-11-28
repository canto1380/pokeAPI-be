import { Router } from "express";
import {characteristByPokemon, getPokemon, getPokemonById} from "../controllers/poke.controller.js";
const router = Router()

router.get('/', getPokemon)
router.get('/:id', getPokemonById)
router.get('/characteristic/:id', characteristByPokemon)

export default router
