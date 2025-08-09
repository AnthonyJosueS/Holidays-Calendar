import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import holidayRoutes from './routes/holidays.routes.js'
import holidaysTypesRoutes from './routes/holidaysTypes.routes.js';

dotenv.config();
const app = express();

app.get('/', (_req, res) => {
  res.send('API Holidays Calendar');
});


app.use(cors());
app.use(express.json());

//Routes
app.use('/api/holidays', holidayRoutes);
app.use('/api/holidays_types', holidaysTypesRoutes);



export default app;