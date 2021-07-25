interface ExerciseInput {
  target: number,
  dailyHours: Array<number>,
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = ({ dailyHours, target }: ExerciseInput): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce((acc, value) => 
    value > 0 ? acc + 1 : acc, 0)
  const average = dailyHours.reduce((sum, value) => sum + value, 0) / periodLength;
  const success = average >= target
  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great';
  } else if (average > target / 2) {
    rating = 2;
    ratingDescription = 'Good';
  } else {
    rating = 1;
    ratingDescription = 'Room for improvement';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const parseExerciseInput = (inputArray: Array<string>): ExerciseInput => {
  if (inputArray.length < 4) {
    throw new Error('Not enough arguments');
  }
  const target = Number(inputArray[2]);
  const dailyHours = inputArray.slice(3).map(value => Number(value));
  if (isNaN(target) || dailyHours.includes(NaN)) {
    throw new Error('All arguments should be numbers');
  }

  return {
    target,
    dailyHours,
  }
}

try {
  console.log(calculateExercises(parseExerciseInput(process.argv)));
} catch (e) {
  console.log('Error:', e.message)
}
