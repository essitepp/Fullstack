import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { OccupationalHealthEntry } from "../types";

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthEntry}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="user md"/>
          {entry.employerName}
        </Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>

      {entry.sickLeave &&
        <Card.Content>
          <Card.Description>
            <strong>
              Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </strong>
          </Card.Description>
        </Card.Content>
      }

      {entry.diagnosisCodes &&
        <Card.Content>
          <List bulleted>
            {entry.diagnosisCodes.map(code => {
              return (
                <List.Item key={code}>
                  <strong>{code}</strong> {diagnoses[code].name}
                </List.Item>
              );
            })}
          </List>
        </Card.Content>
      }
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;