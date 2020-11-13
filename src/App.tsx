import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import { Main } from "./components/Main";
import { RegisterVoterContainer } from "./containers/RegisterVoterContainer";
import { DisplayVotersContainer } from "./containers/DisplayVotersContainer";
import { Elections } from "./components/Elections";
import { CastBallotTool } from "./components/CastBallotTool";


function App() {
  return (
    <div>
      <header>
        <h1>Blue Torch Voting App</h1>
      </header>
      <nav>
            <Link to="/registerVoter">Register Voter</Link>
            <Link to="/displayVoters">Display Voters</Link>
            <Link to="/elections">Elections</Link>
            <Link to="/vote">Vote</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/registerVoter" component={RegisterVoterContainer} />
          <Route path="/displayVoters" component={DisplayVotersContainer} />
          <Route path="/elections" component={Elections} />
          <Route path="/vote" component={CastBallotTool} />
        </Switch>
      </main>
      <br />
      <footer>
        <div className="footer">Blue Torch 2020</div>
      </footer>
    </div>
  );
}

export default App;