import { Entry, EntryType, Gender, HealhtCheckRating, HealthCheckEntryInput, OccupationalHealthEntryInput, HospitalEntryInput, NewEntryInput, NewPatientInput, SickLeave, Discharge, HealthCheckEntry, Diagnosis, BaseEntry, HospitalEntry, OccupationalHealthEntry, } from "./types";

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientInput = ( object: PatientFields ): NewPatientInput => {
  const newPatient: NewPatientInput = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries || [])
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntriesArray(entries)) {
    throw new Error(`Invalid entries: ${entries}`);
  }
  return entries;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error(`Invalid diagnosis codes: ${diagnosisCodes}`);
  }
  return diagnosisCodes;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntriesArray = (param: any): param is Entry[] => {
  if (!(param instanceof Array)) {
    return false;
  }
  return param.every(isEntry);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  if (isHealthCheckEntry(param) || isOccupationalHealthEntry(param) || isHospitalEntry(param)) {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBaseEntry = (param: any): param is BaseEntry => {
  if (
    !isString(param.id) || !isString(param.description) || !isString(param.date)
    || !isString(param.specialist) || (param.diagnosisCodes && !isDiagnosisCodes(param.diagnosisCodes))
  ) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodes = (param: any): param is Array<Diagnosis['code']> => {
  if (!(param instanceof Array)) {
    return false;
  }
  return param.every(isString);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckEntry = (param: any): param is HealthCheckEntry => {
  if (!(param.type === EntryType.HealthCheck) || !isHealthCheckRating(param.healthCheckRating)) {
    return false;
  }
  if (!isBaseEntry(param)) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOccupationalHealthEntry = (param: any): param is OccupationalHealthEntry => {
  if (!(param.type === EntryType.OccupationalHealthcare) || !isString(param.employerName)) {
    return false;
  }
  if (param.sickLeave && !isSickLeave(param.sickLeave)) {
    return false;
  }
  if (!isBaseEntry(param)) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospitalEntry = (param: any): param is HospitalEntry => {
  if (!(param.type === EntryType.Hospital)) {
    return false;
  }
  if (param.discharge && !isDischarge(param.discharge)) {
    return false;
  }
  if (!isBaseEntry(param)) {
    return false;
  }
  return true;
};

type EntryFields = { 
  type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown
 };


const toNewEntryInput = ( object: EntryFields ): NewEntryInput => {
  const type = parseType(object.type);
  switch(type) {
    case EntryType.HealthCheck:
      return toHealthCheckInput(object);
    case EntryType.OccupationalHealthcare:
      return toOccupationalHealthcareInput(object);
    case EntryType.Hospital:
      return toHospitalInput(object);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHealthCheckInput = ( object: any ): HealthCheckEntryInput => {
  const newEntry: HealthCheckEntryInput = {
    type: EntryType.HealthCheck,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes || []),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toOccupationalHealthcareInput = ( object: any ): OccupationalHealthEntryInput => {
  const newEntry: OccupationalHealthEntryInput = {
    type: EntryType.OccupationalHealthcare,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes || []),
    employerName: parseEmployerName(object.employerName),
  };
  if (object.sickLeave) {
    newEntry.sickLeave = parseSickLeave(object.sickLeave);
  }
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHospitalInput = ( object: any ): HospitalEntryInput => {
  const newEntry: HospitalEntryInput = {
    type: EntryType.Hospital,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes || []),
  };
  if (object.discharge) {
    newEntry.discharge = parseDischarge(object.discharge);
  }
  return newEntry;
};


const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Invalid employer name: ${employerName}`);
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error(`Invalid sick leave: ${sickLeave}`);
  }
  return sickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Invalid discharge: ${discharge}`);
  }
  return discharge;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Invalid description: ${description}`);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Invalid specialist: ${specialist}`);
  }
  return specialist;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealhtCheckRating => {
  if ((!healthCheckRating && healthCheckRating !== 0) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Invalid health check rating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error(`Invalid date: ${date}`);
  }
  return date;
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isType(type)) {
    throw new Error(`Invalid type: ${type}`);
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealhtCheckRating => {
  return Object.values(HealhtCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  if (!isString(param.startDate) || !isString(param.endDate)) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if (!isString(param.date) || !isString(param.criteria)) {
    return false;
  }
  return true;
};

export {
  toNewPatientInput,
  toNewEntryInput,
};
