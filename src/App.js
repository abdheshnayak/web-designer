import "./reset.scss";
import "./main.scss";
import Designer from "./routes/Designer";
import { createContext, useEffect, useState } from "react";

// import "ace-builds/src-noconflict/mode-css";
// import "ace-builds/src-noconflict/theme-github";

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
