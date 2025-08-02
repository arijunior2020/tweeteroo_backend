import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

try {
  await mongoClient.connect();
  console.log("✅ Conectado ao MongoDB com sucesso!");
  db = mongoClient.db();
} catch (error) {
  console.error("❌ Erro ao conectar ao MongoDB:", error.message);
  process.exit(1);
}

export default db;
