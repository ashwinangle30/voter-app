import React from "react";

import { ToolHeader } from "./ToolHeader";
import { VoterInteractionContainer } from "../containers/VoterInteractionContainer";

export function CastBallotTool() {

  return (
    <>
      <ToolHeader headerText="Voter Tool" />
        <VoterInteractionContainer />
    </>
  );
}