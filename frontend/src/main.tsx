import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
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
    element: <Dashboard />,
  },
]);

root.render(
  <React.StrictMode>
    <FluentProvider theme={webDarkTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </React.StrictMode>
);
