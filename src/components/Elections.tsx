import React from "react";
import "./Elections.css"
import {
  useParams,
  useHistory,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import {ElectionsTable} from "./ElectionsTable";
import {ElectionsForm} from "./ElectionsForm";
import {ElectionsResult} from "./ElectionsResult";

export const Elections = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const routeMatch = useRouteMatch();

  console.log(routeMatch.path);

  return (
    <>
      <ElectionsTable />
      <ElectionsForm />
      <ElectionsResult />
    </>
  );
};