import React, { ReactElement } from "react";
import { Icon } from "semantic-ui-react";
import { Gender } from "../types";
import { assertNever } from "../utils";

const GenderIcon = ({ gender }: { gender: Gender }): ReactElement => {
  switch(gender) {
    case Gender.Female:
      return <Icon name='venus' />;
    case Gender.Male:
      return <Icon name='mars' />;
    case Gender.Other:
      return <Icon name='other gender vertical' />;
    default:
      assertNever(gender);
      return <div></div>;
  }
};

export default GenderIcon;