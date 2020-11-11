import React from "react";

import { ToolHeader } from "../components/ToolHeader";
import { VoterInteractionContainer } from "../containers/VoterInteractionContainer";

export function VoterTool() {

  return (
    <>
      <ToolHeader headerText="Voter Tool" />
        <VoterInteractionContainer />
    </>
  );
}
