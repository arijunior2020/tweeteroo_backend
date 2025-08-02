import { Router } from "express";
import { signUp } from "../controllers/usersController.js";

const usersRouter = Router();

/**
 * POST /sign-up
 * Cadastra um novo usuário na plataforma
 */
usersRouter.post("/sign-up", signUp);

export default usersRouter;
