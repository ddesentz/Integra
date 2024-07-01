import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  useOutlet,
  Route,
} from "react-router-dom";
import { GlobalStyles } from "tss-react";
import { useStyles } from "tss-react/mui";
import { Integra } from "./client/pages/Integra/Integra";
import { loader } from "@monaco-editor/react";
import { integraTheme } from "./client/common/Theme";

const AuthLayout = () => {
  const outlet = useOutlet();
  const { theme } = useStyles();
  loader.init().then((monaco) => {
    monaco.editor.defineTheme("integraObject", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": integraTheme.palette.background.default,
      },
    });
  });

  return (
    <>
      {outlet}
      <GlobalStyles
        styles={{
          "*::-webkit-scrollbar": {
            width: "1em",
            height: "1em",
          },
          "*::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.default,
            borderRadius: theme.spacing(2),
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.spacing(2),
            border: `0.3em solid ${theme.palette.background.default}`,
          },
          "*::-webkit-scrollbar-corner": {
            backgroundColor: theme.palette.background.default,
          },
          ".ReactVirtualized__Grid__innerScrollContainer": {
            display: "flex",
          },
        }}
      />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/:page?" element={<Integra />} />
    </Route>
  )
);
