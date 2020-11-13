import React, { useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { VoterToolState } from "../models/voterStore";

import { 
  refreshVoters, 
  createSortVotersAction,
  replaceVoter,
  createEditVoterAction,
  createCancelVoterAction,
  removeVoter,
} from "../actions/manageVotersActions";
import { DisplayVoters } from "../components/DisplayVoters";

export function DisplayVotersContainer() {
  
  // const stateProps = useSelector((state: VotersState) => {
  //   return {
  //     voters: state.voters,
  //   };
  // }) as { voters: Voter[]; };
  
  const stateProps = useSelector((state: VoterToolState) => {
    return {
      unsortedVoters: state.manageVoters.voters,
      votersSort: state.manageVoters.votersSort,
      editVoterId: state.manageVoters.editVoterId,
    };
  });

  const { sortCol, sortDir } = stateProps.votersSort;
  const { unsortedVoters } = stateProps;

  const sortedVoters = useMemo(
      () =>
          [...unsortedVoters].sort((a, b) => {
            if (a[sortCol] < b[sortCol]) {
              return sortDir === "asc" ? -1 : 1;
            } else if (a[sortCol] > b[sortCol]) {
              return sortDir === "asc" ? 1 : -1;
            } else {
              return 0;
            }
          }),
      [unsortedVoters, sortCol, sortDir]
  );

  
  const dispatch = useDispatch();
  
  useEffect(() => {
    refreshVoters()(dispatch);
  }, [dispatch]);

  const boundActionProps = useMemo(
    () =>
      bindActionCreators(
        {
          onRefreshVoters: refreshVoters,
          onSortVoters: createSortVotersAction,
          onSaveVoter: replaceVoter,
          onEditVoter: createEditVoterAction,
          onCancelVoter: createCancelVoterAction,
          onDeleteVoter: removeVoter,
        },
        dispatch
      ),
    [dispatch]
  );

  return <DisplayVoters {...stateProps} voters={sortedVoters} {...boundActionProps} />;
}
