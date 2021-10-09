export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Entry =
  | OccupationalHealthEntry
  | HospitalEntry
  | HealthCheckEntry;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export enum HealhtCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealhtCheckRating;
}


export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge?: Discharge;
}

export type HealthCheckEntryInput = Omit<HealthCheckEntry, 'id'>;
export type OccupationalHealthEntryInput = Omit<OccupationalHealthEntry, 'id'>;
export type HospitalEntryInput = Omit<HospitalEntry, 'id'>;

export type NewEntryInput = HealthCheckEntryInput | OccupationalHealthEntryInput | HospitalEntryInput;


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatientInput = Omit<Patient, 'id'>;