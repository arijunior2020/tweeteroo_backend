import Joi from "joi";

/**
 * Esquema de validação para cadastro de usuário.
 * 
 * Campos esperados:
 * - username: string obrigatória (nome de usuário único)
 * - avatar: string obrigatória com formato de URL (endereço da imagem de perfil)
 */
export const userSchema = Joi.object({
  username: Joi.string().required(),
  avatar: Joi.string().uri().required()
});
