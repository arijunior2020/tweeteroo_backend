import db from "../database/mongo.js";
import { ObjectId } from "mongodb";
import { tweetSchema } from "../schemas/tweetsSchema.js";

/**
 * POST /tweets
 * Publica um novo tweet para um usuário existente.
 * Valida os dados, verifica se o usuário está cadastrado e salva o tweet no MongoDB.
 */
export async function postTweet(req, res) {
  const { username, tweet } = req.body;

  const { error } = tweetSchema.validate({ username, tweet }, { abortEarly: false });

  if (error) {
    return res.status(422).send(error.details.map(d => d.message));
  }

  try {
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(401).send({ message: "Usuário não cadastrado" });
    }

    await db.collection("tweets").insertOne({ username, tweet });

    return res.status(201).send({ message: "Tweet publicado com sucesso!" });
  } catch (err) {
    console.error("Erro ao publicar tweet:", err.message);
    return res.sendStatus(500);
  }
}

/**
 * GET /tweets
 * Retorna todos os tweets publicados, em ordem decrescente (mais recentes primeiro),
 * incluindo o avatar do usuário relacionado a cada tweet.
 */
export async function getTweets(req, res) {
  try {
    const tweets = await db
      .collection("tweets")
      .find()
      .sort({ _id: -1 }) // mais novos primeiro
      .toArray();

    if (!tweets.length) return res.send([]);

    const response = await Promise.all(
      tweets.map(async (t) => {
        const user = await db.collection("users").findOne({ username: t.username });
        return {
          _id: t._id,
          username: t.username,
          tweet: t.tweet,
          avatar: user?.avatar || "" // caso tenha sido deletado
        };
      })
    );

    res.send(response);
  } catch (err) {
    console.error("Erro ao buscar tweets:", err.message);
    res.sendStatus(500);
  }
}

/**
 * PUT /tweets/:id
 * Atualiza o conteúdo de um tweet com base no seu ID.
 * Valida os dados recebidos e garante que o tweet exista antes de editar.
 */
export async function updateTweet(req, res) {
  const { id } = req.params;
  const { username, tweet } = req.body;

  const { error } = tweetSchema.validate({ username, tweet }, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details.map(d => d.message));
  }

  try {
    const tweetExists = await db.collection("tweets").findOne({ _id: new ObjectId(id) });

    if (!tweetExists) {
      return res.status(404).send({ message: "Tweet não encontrado" });
    }

    await db.collection("tweets").updateOne(
      { _id: new ObjectId(id) },
      { $set: { username, tweet } }
    );

    return res.sendStatus(204);
  } catch (err) {
    console.error("Erro ao editar tweet:", err.message);
    return res.sendStatus(500);
  }
}

/**
 * DELETE /tweets/:id
 * Remove um tweet do banco de dados com base no seu ID.
 * Garante que o tweet exista antes de realizar a exclusão.
 */
export async function deleteTweet(req, res) {
  const { id } = req.params;

  try {
    const tweet = await db.collection("tweets").findOne({ _id: new ObjectId(id) });

    if (!tweet) {
      return res.status(404).send({ message: "Tweet não encontrado" });
    }

    await db.collection("tweets").deleteOne({ _id: new ObjectId(id) });

    return res.sendStatus(204);
  } catch (err) {
    console.error("Erro ao deletar tweet:", err.message);
    return res.sendStatus(500);
  }
}

