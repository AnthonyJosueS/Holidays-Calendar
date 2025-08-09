import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "@prisma/client";

const config = {
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: process.env.DB_ENCRYPT || true, 
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE || true,
    },
}

const adapter = new PrismaMssql(config);
const prisma = new PrismaClient({ adapter });

export default prisma;