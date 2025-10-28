import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoute);
app.get('/', (req, res) => {
  res.send('AI Docstring Generator Backend Running...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
})
