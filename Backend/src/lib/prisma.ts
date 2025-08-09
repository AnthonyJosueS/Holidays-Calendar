import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "@prisma/client";
import { config as configDotenv } from "dotenv";

configDotenv();

const {
  DB_SERVER,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_ENCRYPT,
  DB_TRUST_SERVER_CERTIFICATE,
} = process.env;

if (!DB_SERVER || !DB_PORT || !DB_DATABASE || !DB_USER || !DB_PASSWORD) {
  throw new Error("Faltan variables de entorno necesarias para la base de datos");
}

const config = {
    server: DB_SERVER,
    port: parseInt(DB_PORT),
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    options: {
        encrypt: DB_ENCRYPT === 'true' ? true : false, 
        trustServerCertificate: DB_TRUST_SERVER_CERTIFICATE === 'true' ? true : false, 
    },
}

const adapter = new PrismaMssql(config);
const prisma = new PrismaClient({ adapter });

export default prisma;
