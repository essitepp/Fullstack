import React, { ReactElement } from "react";
import { Icon } from "semantic-ui-react";
import { HealhtCheckRating } from "../types";
import { assertNever } from "../utils";


const HealthCheckRatingIcon = ({ rating }: { rating: HealhtCheckRating }): ReactElement => {
  switch(rating) {
    case HealhtCheckRating.Healthy:
      return <Icon name="heart" color="green"/>;
    case HealhtCheckRating.LowRisk:
      return <Icon name="heart" color="yellow"/>;
    case HealhtCheckRating.HighRisk:
      return <Icon name="heart" color="orange"/>;
    case HealhtCheckRating.CriticalRisk:
      return <Icon name="heart" color="red"/>;
    default:
      assertNever(rating);
      return <div></div>;
  }
};

export default HealthCheckRatingIcon;