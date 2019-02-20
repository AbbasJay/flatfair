import React, { Component } from "react";
import "./app.scss";
import RegistrationPage from "../../screens/registrationPage/registrationPage";
import WelcomePage from "../../screens/welcomePage/welcomePage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="nav-container">
            <div>
              <Link to="/" className="route-link" />
            </div>
            <div>
              <Link to="/WelcomePage/" className="route-link" />
            </div>
          </nav>
          <Route path="/" exact component={RegistrationPage} />
          <Route path="/welcome/" component={WelcomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
