import express from 'express';
import patientService from '../services/patientService';
import toNewPatientInput from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  const newPatient = toNewPatientInput(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});


export default router;