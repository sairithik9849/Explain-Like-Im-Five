import express from 'express';
import 'dotenv/config';
import configRoutes from './routes/index.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log(`We've now got a server!`);
  console.log(`Your routes will be running on http://localhost:3000`);
});