import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import { Main } from "./components/Main";
import { RegisterVoter } from "./components/RegisterVoter";
import { DisplayVoters } from "./components/DisplayVoters";
import { Elections } from "./components/Elections";
import { Vote } from "./components/Vote";

function App() {
  return (
    <div>
      <header>
        <h1>Blue Torch Voting App</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/registerVoter">Register Voter</Link>
          </li>
          <li>
            <Link to="/displayVoters">Display Voters</Link>
          </li>
          <li>
            <Link to="/elections">Elections</Link>
          </li>
          <li>
            <Link to="/vote">Vote</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/registerVoter" component={RegisterVoter} />
          <Route path="/displayVoters" component={DisplayVoters} />
          <Route path="/elections" component={Elections} />
          <Route path="/vote" component={Vote} />
        </Switch>
      </main>
      <footer>
        <small>Blue Torch</small>
      </footer>
    </div>
  );
}

export default App;