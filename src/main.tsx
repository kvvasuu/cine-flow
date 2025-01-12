import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./app/App.tsx";
import MainStoreProvider from "./store/MainStore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainStoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainStoreProvider>
  </StrictMode>
);
