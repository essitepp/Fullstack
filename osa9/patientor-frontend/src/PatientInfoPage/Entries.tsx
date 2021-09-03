import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const Entries = ({ entries }: { entries: Entry[] }) => {

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntry entry={entry}/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry}/>;
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry}/>;
      default:
        return assertNever(entry);
    }
  };

  if (entries.length === 0) {
    return (
      <div>
        No entries yet
      </div>
    );
  }

  return (
    <div>
      {entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
    </div>
  );
};

export default Entries;