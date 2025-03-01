import React from "react";
import ReactDOM from "react-dom/client";
import store from "./state/store";
import { Provider } from "react-redux";
import routing from "./routing";
import { BrowserRouter, useRoutes } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./static/styles/index.scss";

const Routing = () => useRoutes(routing);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  </LocalizationProvider>
);
