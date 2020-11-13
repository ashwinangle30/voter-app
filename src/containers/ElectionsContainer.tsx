import React, { useEffect, useMemo } from "react";
import {ElectionsInteractionForms} from "../components/ElectionsInteractionForms";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { VoterToolState } from "../models/voterStore";
import { refreshElections, retrieveElection } from '../actions/manageElectionsActions';

export const ElectionsContainer = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    refreshElections()(dispatch);
  }, [dispatch]);


  const stateProps = useSelector((state: VoterToolState) => {
      return {
          elections: state.manageElections.elections,
          election: state.manageElections.election,
          electionInteractionStep: state.manageElections.electionInteractionStep,
      };
  });

  // useMemo hook allows us to NOT create these every single time
  const boundActionProps = useMemo(
      () => bindActionCreators({
      onRefreshElections: refreshElections,
      onShowResultsForElection: retrieveElection,
  },
  dispatch
  ), [dispatch]);


  return (
      <ElectionsInteractionForms {...stateProps} {...boundActionProps} />
  );
};