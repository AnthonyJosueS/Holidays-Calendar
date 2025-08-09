import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "@prisma/client";

const config = {
    server: 'localhost',
    port: 58630,
    database: 'holidays_calendar_db',
    user: 'sa',
    password: 'BD1998',
    options: {
        encrypt: true, 
        trustServerCertificate: true,
    },
}

const adapter = new PrismaMssql(config);
const prisma = new PrismaClient({ adapter });

export default prisma;