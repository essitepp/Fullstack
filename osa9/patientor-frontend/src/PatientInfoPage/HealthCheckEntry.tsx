import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import HealthCheckRatingIcon from "../components/HealthCheckRatingIcon";
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope"/>
          <HealthCheckRatingIcon rating={entry.healthCheckRating}/>
        </Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      
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

export default HealthCheckEntryDetails;