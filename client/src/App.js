import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import _HomePage from "./components/_HomePage";
import HomePage from "./components/HomePage";
import AddItem from "./components/AddItem";
import ViewItem from "./components/ViewItem";
import EditItem from "./components/EditItem";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" component={HomePage} exact={true} />
                        <Route path="/add-item" component={AddItem} />
                        <Route path="/item/:id" component={ViewItem} />
                        <Route path="/edit-item/:id" component={EditItem} />
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
