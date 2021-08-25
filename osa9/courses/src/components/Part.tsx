import React from "react";
import { CoursePart } from "../types";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const padding = {
    paddingTop: 10,
    paddingBottom: 5
  };

  switch (coursePart.type) {
    case 'normal':
      return (
        <div style={padding}>
          <div><strong>{coursePart.name}</strong> ({coursePart.exerciseCount} exercises)</div>
          <div><em>{coursePart.description}</em></div>
        </div>
      );
    case 'groupProject':
      return (
        <div style={padding}>
          <div><strong>{coursePart.name}</strong> ({coursePart.exerciseCount} exercises)</div>
          <div>Group projects: {coursePart.groupProjectCount}</div>
        </div>
      );
    case 'submission':
      return (
        <div style={padding}>
          <div><strong>{coursePart.name}</strong> ({coursePart.exerciseCount} exercises)</div>
          <div><em>{coursePart.description}</em></div>
          <div>Submissions: <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a></div>
        </div>
      );
    case 'special':
      return (
        <div style={padding}>
          <div><strong>{coursePart.name}</strong> ({coursePart.exerciseCount} exercises)</div>
          <div><em>{coursePart.description}</em></div>
          <div>Required skills: {coursePart.requirements.join(', ')}</div>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;