import db from "../database/mongo.js";
import { userSchema } from "../schemas/usersSchema.js";

/**
 * POST /sign-up
 * Cadastra um novo usuário na plataforma.
 * 
 * - Valida os dados recebidos (username e avatar).
 * - Impede duplicação de usernames já cadastrados.
 * - Armazena o novo usuário na collection "users".
 * 
 * Retornos possíveis:
 * - 201: Cadastro realizado com sucesso
 * - 409: Usuário já existe
 * - 422: Dados inválidos
 * - 500: Erro interno ao salvar
 */
export async function signUp(req, res) {
  const { username, avatar } = req.body;

  // Validação com Joi
  const { error } = userSchema.validate({ username, avatar }, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details.map(d => d.message));
  }

  try {
    // Verifica se o usuário já está cadastrado
    const userExists = await db.collection("users").findOne({ username });

    if (userExists) {
      return res.status(409).send({ message: "Usuário já está cadastrado!" });
    }

    // Insere o novo usuário
    await db.collection("users").insertOne({ username, avatar });

    return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar usuário:", err.message);
    return res.sendStatus(500);
  }
}
