import React from "react";
import {
  useParams,
  useHistory,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

export const Elections = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const routeMatch = useRouteMatch();

  console.log(routeMatch.path);

  return (
    <div>
      Elections
    </div>
  );
};