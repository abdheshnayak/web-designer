import "./reset.scss";
import "./main.scss";
import Designer from "./routes/Designer";
import { createContext, Fragment, useEffect, useState } from "react";

export const GlobPreference = createContext();

function App() {
  const [hashmap, sethashmap] = useState({});
  const [refresh, setrefresh] = useState(true);
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
      value={{ hashmap, sethashmap, refresh, setrefresh }}
    >
      <Designer />
    </GlobPreference.Provider>
  );
}

export default App;
