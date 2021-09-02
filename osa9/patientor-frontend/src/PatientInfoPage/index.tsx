import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Table } from "semantic-ui-react";
import GenderIcon from "../components/GenderIcon";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";
import Entries from "./Entries";


const PatientInfoPage = () => {

  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient: Patient = patients[id];


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
      {patient.entries &&
        <Entries entries={patient.entries} />
      }
      
    </div>
  );
}; 

export default PatientInfoPage;