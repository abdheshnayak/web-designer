import "./reset.scss";
import "./main.scss";
import Designer from "./routes/Designer";
import { createContext, useEffect, useState } from "react";
import { getSavedActive, saveActive } from "./utils/common";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BrowseFullPage from "./routes/BrowseFullPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllDesignes from "./routes/AllDesignes";
import Login from "./modules/SignIn";
import PublicRoute from "./auth-utils/PublicRoute";
import SignUp from "./modules/SignIn/SignUp";

export const GlobPreference = createContext();

function App() {
  const [hashmap, sethashmap] = useState({ is_css_editor_on: "single" });

  const [is_saving, setis_saving] = useState(0);

  useEffect(() => {
    saveActive(hashmap.active_id);
  }, [hashmap.active_id]);

  useEffect(() => {
    sethashmap((s) => {
      return {
        ...s,
        screen_class: "desktop",
        editor_height: "300",
      };
    });
  }, []);

  return (
    <GlobPreference.Provider
      value={{
        hashmap,
        sethashmap,
        is_saving,
        setis_saving,
      }}
    >
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Designer />
          </Route>
          <Route path="/view/:id" component={BrowseFullPage} />
          <Route path="/all-designs">
            <AllDesignes />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </GlobPreference.Provider>
  );
}

export default App;
