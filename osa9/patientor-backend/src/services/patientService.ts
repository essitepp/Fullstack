import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NewPatientInput, Patient, PublicPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
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
  getPublicPatients,
  getPatient,
  addPatient,
};