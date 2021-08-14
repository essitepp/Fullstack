import patients from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => 
    rest
  );
};


export default {
  getPatients,
  getNonSensitivePatients
};