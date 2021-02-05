interface Result {
  days: number;
  trainingDays: number;
  target: number;
  averageTime: number;
  targetReached: boolean;
  rating: number;
  ratingDescription: string;
}


const calculateExercises = (exerciseHours: number[], target: number): Result => {
  const days = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h != 0).length;
  const totalTrainingTime = exerciseHours.reduce((sum, value) => sum + value, 0);
  const averageTime = totalTrainingTime / days;
  const targetReached = averageTime >= target;
  let rating;
  let ratingDescription;
  if (targetReached) {
    rating = 3;
    ratingDescription = 'Target reached, good job!'
  } else if (averageTime > target/1.5) {
    rating = 2;
    ratingDescription = 'You got close to the target!'
  } else {
    rating = 1;
    ratingDescription = 'You didn\'t reach the target this time, keep trying!'
  }
  return {
    days,
    trainingDays,
    target,
    averageTime,
    targetReached,
    rating,
    ratingDescription
  }
}


const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2])
  const days = args.slice(3).map(d => Number(d))

  if (!isNaN(target) && days.every(d => !isNaN(d))) {
    return {
      target,
      days
    }
  } else {
    throw new Error('Provided arguments were not numbers')
  }
}

interface ExerciseInput {
  target: number;
  days: number[];
}


try {
  const { target, days } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (e) {
  console.log('Error, something went wrong, message: ', e.message);
}


