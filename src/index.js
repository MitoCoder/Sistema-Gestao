import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from './App';
import Login from "./login"; // Importe o componente de Login

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Login /> {/* Renderize o componente de Login aqui em vez de App */}
  </React.StrictMode>
);
