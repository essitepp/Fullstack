import React from "react";
import { List } from "semantic-ui-react";
import { Entry } from "../types";

const Entries = ({ entries }: { entries: Entry[] }) => {

  return (
    <List relaxed celled>
      {entries.map(entry => {
        return (
          <List.Item key={entry.id}>
            <List.Header>
              {entry.date}
            </List.Header>
            <List.Content>
              {entry.description}
            </List.Content>
            {entry.diagnosisCodes &&
              <ul>
                {entry.diagnosisCodes.map(code => {
                  return (
                    <li key={code}>
                      {code}
                    </li>
                  );
                })}
              </ul>
            }
          </List.Item>
        );
        })
      }
    </List>
  );
};

export default Entries;