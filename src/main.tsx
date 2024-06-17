import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleMapsWrapper from "./components/GoogleMapsWrapper";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/:slug?",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <MantineProvider>
      <GoogleMapsWrapper>
        <RouterProvider router={router} />
      </GoogleMapsWrapper>
    </MantineProvider>
  </>
);
