import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital"/>
        </Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>

      {entry.discharge &&
        <Card.Content>
          <Card.Description><strong>Discharge {entry.discharge.date}</strong></Card.Description>
          <Card.Description>{entry.discharge.criteria}</Card.Description>
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

export default HospitalEntryDetails;