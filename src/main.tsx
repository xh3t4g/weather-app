import { HashRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";

createRoot(document.querySelector('#root')).render(
    <HashRouter>
        <App />
    </HashRouter>
)

