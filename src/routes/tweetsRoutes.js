import { Router } from "express";
import { postTweet, getTweets, updateTweet, deleteTweet } from "../controllers/tweetsController.js";

const tweetsRouter = Router();

/**
 * POST /tweets
 * Publica um novo tweet
 */
tweetsRouter.post("/tweets", postTweet);

/**
 * GET /tweets
 * Retorna todos os tweets, com avatar e ordem decrescente
 */
tweetsRouter.get("/tweets", getTweets);

/**
 * PUT /tweets/:id
 * Edita um tweet existente pelo ID
 */
tweetsRouter.put("/tweets/:id", updateTweet);

/**
 * DELETE /tweets/:id
 * Remove um tweet pelo ID
 */
tweetsRouter.delete("/tweets/:id", deleteTweet);

export default tweetsRouter;
