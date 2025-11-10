import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import "./App.css";
import App from "./App.tsx";
import Dashboard from "./components/account/Dashboard.tsx";
import ErrorPage from "./components/layout/Error.tsx";
import FacilityCreate from "./components/facility/Create.tsx";
import Play from "./components/account/Play.tsx";
import SignIn from "./components/sign/SignIn.tsx";
import SignOut from "./components/sign/SignOut.tsx";
import SignUp from "./components/sign/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/play",
        element: <Play />,
      },
      {
        path: "/create/facility",
        element: <FacilityCreate />,
      },
      {
        path: "/sign/up",
        element: <SignUp />,
      },
      {
        path: "/sign/in",
        element: <SignIn />,
      },
      {
        path: "/sign/out",
        element: <SignOut />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);