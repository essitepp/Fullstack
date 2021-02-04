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


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))