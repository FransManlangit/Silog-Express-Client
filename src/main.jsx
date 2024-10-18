import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.jsx";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <BrowserRouter>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </BrowserRouter>
  </Provider>

);
