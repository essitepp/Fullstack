import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses';


const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};


export default {
  getAllDiagnoses
};