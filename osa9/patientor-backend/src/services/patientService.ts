import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { Entry, NewEntryInput, NewPatientInput, Patient, PublicPatient } from "../types";

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

const addEntry = (patientId: string, newEntry: NewEntryInput): Entry => {
  const entry: Entry = {
    ...newEntry,
    id: uuid(),
  };
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error(`Invalid patient id: ${patientId}`);
  }
  patient.entries.push(entry);
  return entry;
};


export default {
  getPatients,
  getPublicPatients,
  getPatient,
  addPatient,
  addEntry
};