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

export const GlobPreference = createContext();

function App() {
  const [hashmap, sethashmap] = useState({ is_css_editor_on: "single" });

  useEffect(() => {
    saveActive(hashmap.active_id);
  }, [hashmap.active_id]);

  useEffect(() => {
    sethashmap((s) => {
      return {
        ...s,
        screen_class: "desktop",
      };
    });
  }, []);

  return (
    <GlobPreference.Provider
      value={{
        hashmap,
        sethashmap,
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

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </GlobPreference.Provider>
  );
}

export default App;
