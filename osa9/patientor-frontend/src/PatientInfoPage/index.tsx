import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import GenderIcon from "../components/GenderIcon";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import Entries from "./Entries";


const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients[id];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  React.useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(updatePatient(patientData));
      } catch (e) {
        console.error(e);
      }
    };

    if (patient && !patient.ssn) {
      void fetchPatientData();
    }
  });

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const entryToAdd = {
      ...values,
      sickLeave: {
        startDate: values.sickLeaveStartDate,
        endDate: values.sickLeaveEndDate,
      },
      discharge: {
        date: values.dischargeDate,
        criteria: values.dischargeCriteria
      }
    };
    try {
      const {data: newEntry} = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        entryToAdd
      );
      const newPatient = {
        ...patient,
        entries: patient.entries.concat(newEntry)
      };
      dispatch(updatePatient(newPatient));
      closeModal();
    } catch (e) {
      console.log(e.response.data || 'Unknown error');
      setError(e.response.data || 'Unknown error');

    }
  };
  

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name} <GenderIcon gender={patient.gender} /></h2>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>SSN</Table.Cell>
            <Table.Cell>{patient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Date of birth</Table.Cell>
            <Table.Cell>{patient.dateOfBirth}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Occupation</Table.Cell>
            <Table.Cell>{patient.occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <h3>Entries</h3>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      /> 
      <Button onClick={() => openModal()}>Add new entry</Button>
      {patient.entries &&
        <Entries entries={patient.entries} />
      }
      
    </div>
  );
}; 

export default PatientInfoPage;