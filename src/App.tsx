import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import { Main } from "./components/Main";
import { RegisterVoterContainer } from "./containers/RegisterVoterContainer";
import { DisplayVotersContainer } from "./containers/DisplayVotersContainer";
import { CastBallotTool } from "./components/CastBallotTool";
import {ElectionsTool} from "./components/ElectionsTool";


function App() {
  return (
    <div>
      <header>
          <div className="header">
              <h1>Blue Torch Voting App</h1>
              <p><img src="doge.png" alt="doge happy coding!" height="50" width="60"/></p>
              <h3>Lighting the void!</h3>
          </div>
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
          <Route path="/elections" component={ElectionsTool} />
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