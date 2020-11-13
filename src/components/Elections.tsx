import React, { useEffect, useMemo } from "react";
import "./Elections.css"
import {ElectionsTable} from "./ElectionsTable";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { VoterToolState } from "../models/voterStore";
import { refreshElections } from '../actions/manageElectionsActions';


export const Elections = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    refreshElections()(dispatch);
  }, [dispatch]);


  const stateProps = useSelector((state: VoterToolState) => {
      return {
          elections: state.manageElections.elections,
      };
  });

  // useMemo hook allows us to NOT create these every single time
  const boundActionProps = useMemo(
      () => bindActionCreators({
      onRefreshElections: refreshElections,
  },
  dispatch
  ), [dispatch]);

  return <ElectionsTable {...stateProps} {...boundActionProps} />;
};