import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/App.scss";
import Login from "./components/Login";
import Help from "./components/Help";
import Dashboard from "./components/Dashboard/Dashboard";
import Management from "./components/Management";
import ProductIDProvider from "./components/contextAPI/ProductIDContext";
import AuthContextProvider from "./components/contextAPI/AuthContext";
import DayZero from "./components/DayZero";
import ErrorBoundary from "./components/HOC/ErrorBoundary";

const App = () => {
  return (
    <div className="App">
      <ProductIDProvider>
        <AuthContextProvider>
          <ErrorBoundary>
            <Router>
              <Switch>
                <Route path="/about" component={Help} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/management" component={Management} />
                <Route path="/dayZero" component={DayZero} />
                <Route path="/" exact component={Login} />
              </Switch>
            </Router>
          </ErrorBoundary>
        </AuthContextProvider>
      </ProductIDProvider>
    </div>
  );
};

export default App;
