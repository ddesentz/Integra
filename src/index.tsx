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
  apiKey: "AIzaSyCd-juXIN8atCk9BFdMVjJRf4BelyBIngk",
  authDomain: "integra-88dea.firebaseapp.com",
  projectId: "integra-88dea",
  storageBucket: "integra-88dea.appspot.com",
  messagingSenderId: "583298071479",
  appId: "1:583298071479:web:3675ce7bf80fad46c40632",
  measurementId: "G-NK3E2DFGMF",
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
