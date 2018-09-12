import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Contacts from "./components/Contacts";
import Add from "./components/Add";
import Modify from "./components/Modify";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Contact React REStful Api App</h1>
          <div>
            <Link to="/contacts">
              <button>Contacts List</button>
            </Link>
            <Link to="/add_contact">
              <button>Add Contact</button>
            </Link>
          </div>
          <Route path="/contacts" exact component={Contacts} />
          <Route path="/add_contact" exact component={Add} />
          <Route
            path="/modify_contact/:id"
            exact
            render={props => <Modify id={props.match.params.id} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
