interface BmiInput {
  height: number,
  weight: number,
}

export const calculateBmi = ({ height, weight }: BmiInput): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Owerweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

const parseBmiInput = (inputArray: Array<string>): BmiInput => {
  if (inputArray.length > 4) {
    throw new Error('Too many arguments');
  } else if (inputArray.length < 4) {
    throw new Error('Not enough arguments');
  }
  const height = Number(inputArray[2]);
  const weight = Number(inputArray[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('All arguments should be numbers');
  }
  return {
    height,
    weight,
  };
};

try {
  console.log(calculateBmi(parseBmiInput(process.argv)));
} catch (e) {
  console.log('Error:', (e as Error).message);
}
