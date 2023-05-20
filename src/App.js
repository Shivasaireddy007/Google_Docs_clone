import Grid from "@material-ui/core/Grid";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Editor from "./Editor";
import Header from "./Header";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/document/${uuidV4()}`} />
        </Route>
        <Route path="/document/:id">
          <Header />
          <Grid
            style={{
              marginTop: "4rem",
              display: "flex",
              height: 'calc(100vh - 65px)'
            }}
          >
            <Editor />
            <Sidebar />
          </Grid>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
