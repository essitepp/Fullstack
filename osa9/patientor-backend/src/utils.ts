import { Gender, NewPatientInput } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientInput = ( object: Fields ): NewPatientInput => {
  const newPatient: NewPatientInput = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return newPatient;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Invalid name: ${name}`);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error(`Invalid date of birth: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Invalid ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Invalid gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Invalid occupation: ${occupation}`);
  }
  return occupation;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


export default toNewPatientInput;