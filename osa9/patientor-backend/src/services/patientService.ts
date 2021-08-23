import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NewPatientInput, NonSensitivePatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => 
    rest
  );
};

const addPatient = (newPatient: NewPatientInput): Patient => {
  const patient: Patient = {
    ...newPatient,
    id: uuid(),
  };
  patients.push(patient);
  return patient;
};


export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};