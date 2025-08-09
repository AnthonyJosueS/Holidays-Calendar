import { configDotenv } from 'dotenv';
import app from './app.js';

configDotenv();
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
