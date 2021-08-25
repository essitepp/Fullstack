import React from "react";
import { CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
        Total number of exercises:{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;