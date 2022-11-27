import { Router } from "express";
import {getPokemon, getPokemonById} from "../controllers/poke.controller.js";
const router = Router()

router.get('/', getPokemon)
router.get('/:id', getPokemonById)

export default router
