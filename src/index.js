import React from "react";
import ReactDOM from "react-dom";
import { CarsTable } from "./components/CarsTable/CarsTable";
import { Provider } from "react-redux";
import { store } from "./store";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CarsTable />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
