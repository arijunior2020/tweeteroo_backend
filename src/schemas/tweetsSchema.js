import Joi from "joi";

/**
 * Esquema de validação para criação e edição de tweets.
 * 
 * Campos esperados:
 * - username: string obrigatória (identificador do usuário autor do tweet)
 * - tweet: string obrigatória (conteúdo do tweet)
 */
export const tweetSchema = Joi.object({
  username: Joi.string().required(),
  tweet: Joi.string().required()
});
