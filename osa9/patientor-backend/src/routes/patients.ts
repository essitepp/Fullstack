import express from 'express';
import patientService from '../services/patientService';
import { toNewEntryInput, toNewPatientInput } from '../utils';

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

router.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntryInput(req.body);
  const addedEntry = patientService.addEntry(req.params.id, newEntry);
  res.json(addedEntry);
});


export default router;