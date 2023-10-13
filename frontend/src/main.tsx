import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import "./style.css";

const container = document.getElementById("root");

const root = createRoot(container!);

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
]);

root.render(
  <React.StrictMode>
    <FluentProvider theme={webDarkTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </React.StrictMode>
);
