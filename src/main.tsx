import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

if (globalThis.matchMedia) {
  if (globalThis.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  }

  globalThis
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const theme = event.matches ? "dark" : "light";
      document.documentElement.classList[theme === "dark" ? "add" : "remove"](
        "dark"
      );
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
