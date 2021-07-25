/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400);
    res.send({ error: "malformatted parameters" });
    return;
  }
  const bmi = calculateBmi({ height, weight });
  res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400);
    res.send({ error: 'parameters missing' });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hoursInput: any = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const targetInput: any = req.body.target;

  const hours = Array.isArray(hoursInput) ? hoursInput.map(Number) : null;
  const target = Number(targetInput);
  if (!hours || hours.includes(NaN) || isNaN(target)) {
    res.status(400);
    res.send({ error: 'malformatted parameters' });
    return;
  }
  res.send(calculateExercises({ dailyHours: hours, target }));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});