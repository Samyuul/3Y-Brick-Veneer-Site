import React from "react";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { createRoot } from "react-dom/client"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement)

root.render(  
  <BrowserRouter>
    <App />
  </BrowserRouter>)

serviceWorker.register();