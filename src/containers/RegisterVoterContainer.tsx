import React, { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import { appendVoter } from "../actions/manageVotersActions";
import { RegisterVoter } from "../components/RegisterVoter";

export function RegisterVoterContainer() {
  const dispatch = useDispatch();

  const boundActionProps = useMemo(
      () =>
          bindActionCreators(
              {
                onSubmitVoter: appendVoter,
              },
              dispatch
          ),
      [dispatch]
  );

  return <RegisterVoter {...boundActionProps} />;
}
