import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleMapsWrapper from "./components/GoogleMapsWrapper";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/:slug?",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <GoogleMapsWrapper>
      <RouterProvider router={router} />
    </GoogleMapsWrapper>
  </>
);
