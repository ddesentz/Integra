import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { ThemeProvider } from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { RouterProvider } from "react-router-dom";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import "@preact/signals-react/auto";
import { integraTheme } from "./client/common/Theme";
import { AppSignals } from "./client/common/AppContext";
import { rootSignals } from "./client/signals/RootSignals";
import { router } from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyAMMhQk4BBYR-xiQYwwz3xTlWz6bqA62vw",
  authDomain: "leaguelink-35ecc.firebaseapp.com",
  projectId: "leaguelink-35ecc",
  storageBucket: "leaguelink-35ecc.appspot.com",
  messagingSenderId: "70075954536",
  appId: "1:70075954536:web:0f22957bda7041695dd2dd",
  measurementId: "G-GQSH44SZH7",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = "en";
const functions = getFunctions(app);
if (process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();

initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentMultipleTabManager() }
  ),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

root.render(
  <ThemeProvider theme={integraTheme}>
    <AppSignals.Provider value={rootSignals}>
      <RouterProvider router={router} />
    </AppSignals.Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
